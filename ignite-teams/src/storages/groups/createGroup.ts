import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllGroups } from './getAllGroups'
import { CustomError } from '@utils/CustomError'
import { GROUP_COLLECTION } from '../config'

export async function createGroup(newGroup: string) {
  try {
    const storedGroups = await getAllGroups()

    const groupAlreadyExists = storedGroups.includes(newGroup)

    if (groupAlreadyExists)
      throw new CustomError('Já existe uma turma cadastrada com este nome.')

    const groupsToStore = JSON.stringify([...storedGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, groupsToStore)
  } catch (error) {
    if (error instanceof CustomError) throw error

    throw new Error()
  }
}
