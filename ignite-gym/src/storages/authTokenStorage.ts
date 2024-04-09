import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_STORAGE } from './config'

interface storageAuthToken {
  token: string
  refreshToken: string
}

export async function saveAuthTokenStorage({
  token,
  refreshToken,
}: storageAuthToken) {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refreshToken }),
  )
}

export async function loadAuthTokenStorage() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  const { token, refreshToken }: storageAuthToken = response
    ? JSON.parse(response)
    : {}

  return { token, refreshToken }
}

export async function removeAuthTokenStorage() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
