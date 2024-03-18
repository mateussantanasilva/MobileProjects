import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllGroups } from './getAllGroups'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '../config'

export async function removeGroup(groupToRemove: string) {
  try {
    const storedGroups = await getAllGroups()

    const filteredGroups = storedGroups.filter(
      (group) => group !== groupToRemove,
    )

    const groupsToStore = JSON.stringify(filteredGroups)

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupToRemove}`)
    await AsyncStorage.setItem(GROUP_COLLECTION, groupsToStore)
  } catch (error) {
    if (error instanceof Error) throw error

    throw new Error()
  }
}
