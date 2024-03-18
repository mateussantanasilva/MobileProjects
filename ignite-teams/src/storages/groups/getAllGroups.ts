import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '../config'

export async function getAllGroups() {
  try {
    const storedGroups = await AsyncStorage.getItem(GROUP_COLLECTION)

    const groups: string[] = storedGroups ? JSON.parse(storedGroups) : []

    return groups
  } catch (error) {
    if (error instanceof Error) throw error

    throw new Error()
  }
}
