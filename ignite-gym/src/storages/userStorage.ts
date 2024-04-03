import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserDTO } from 'src/@types/UserDTO'
import { USER_STORAGE } from './config'

export async function saveUserStorage(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function loadUserStorage() {
  const storedUser = await AsyncStorage.getItem(USER_STORAGE)

  const user: UserDTO | null = storedUser ? JSON.parse(storedUser) : null

  return user
}

export async function removeUserStorage() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
