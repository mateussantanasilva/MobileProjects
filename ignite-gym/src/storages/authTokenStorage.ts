import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_STORAGE } from './config'

export async function saveAuthTokenStorage(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
}

export async function loadAuthTokenStorage() {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  return token
}

export async function removeAuthTokenStorage() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
