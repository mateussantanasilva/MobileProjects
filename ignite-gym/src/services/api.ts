import {
  loadAuthTokenStorage,
  saveAuthTokenStorage,
} from '@storage/authTokenStorage'
import { CustomError } from '@utils/CustomError'
import axios, { AxiosError, AxiosInstance } from 'axios'

type SignOutFunction = () => Promise<void>

interface PromiseType {
  onSucess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOutFunction) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.0.5:3333',
}) as APIInstanceProps

let faultRequestQueue: Array<PromiseType> = []
let isUpdatingToken = false

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError.response.status === 401) {
        const itsTokenRelatedError =
          requestError.response.data.message === 'token.expired' ||
          requestError.response.data.message === 'token.invalid'

        if (!itsTokenRelatedError) signOut()

        const { refreshToken } = await loadAuthTokenStorage()

        if (!refreshToken) {
          signOut()

          return Promise.reject(requestError)
        }

        const originalRequestConfig = requestError.config

        if (isUpdatingToken) {
          return new Promise((resolve, reject) => {
            faultRequestQueue.push({
              onSucess: (token) => {
                originalRequestConfig.headers = {
                  Authorization: `Bearer ${token}`,
                }
                resolve(api(originalRequestConfig))
              },

              onFailure: (error) => {
                reject(error)
              },
            })
          })
        }

        isUpdatingToken = true

        // search for updated token
        return new Promise((resolve, reject) => {
          api
            .post('/sessions/refresh-token', {
              refresh_token: refreshToken,
            })
            .then(async ({ data }) => {
              await saveAuthTokenStorage({
                token: data.token,
                refreshToken: data.refresh_token,
              })

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                )
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              }
              api.defaults.headers.common.Authorization = `Bearer ${data.token}`

              faultRequestQueue.forEach((request) =>
                request.onSucess(data.token),
              )
            })
            .catch((error) => {
              if (error instanceof AxiosError)
                faultRequestQueue.forEach((request) => request.onFailure(error))

              signOut()
              reject(error)
            })
            .finally(() => {
              isUpdatingToken = false
              faultRequestQueue = []
            })
        })
      }

      if (requestError.response.data)
        return Promise.reject(
          new CustomError(requestError.response.data.message),
        )

      return Promise.reject(requestError)
    },
  )

  return () => api.interceptors.response.eject(interceptTokenManager) // removes manager
}

export { api }
