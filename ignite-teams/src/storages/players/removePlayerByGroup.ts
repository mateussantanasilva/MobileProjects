import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPlayersByGroup } from './getPlayersByGroup'
import { PLAYER_COLLECTION } from '../config'

export async function removePlayerByGroup(
  playerToRemove: string,
  group: string,
) {
  try {
    const storedPlayers = await getPlayersByGroup(group)

    const filteredPlayers = storedPlayers.filter(
      (player) => player.name !== playerToRemove,
    )

    const playersToStore = JSON.stringify(filteredPlayers)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, playersToStore)
  } catch (error) {
    if (error instanceof Error) throw error

    throw new Error()
  }
}
