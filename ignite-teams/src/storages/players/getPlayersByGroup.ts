import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '../config'
import { PlayerDTO } from './PlayerDTO'

export async function getPlayersByGroup(group: string) {
  try {
    const storedPlayers = await AsyncStorage.getItem(
      `${PLAYER_COLLECTION}-${group}`,
    )

    const players: PlayerDTO[] = storedPlayers ? JSON.parse(storedPlayers) : []

    return players
  } catch (error) {
    if (error instanceof Error) throw error

    throw new Error()
  }
}
