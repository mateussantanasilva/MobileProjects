import { CustomError } from '@utils/CustomError'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.5',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data)
      return Promise.reject(new CustomError(error.response.data.message))

    return Promise.reject(error)
  },
)

export { api }
