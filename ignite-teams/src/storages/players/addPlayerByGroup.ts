import { CustomError } from '@utils/CustomError'
import { PlayerDTO } from './PlayerDTO'
import { getPlayersByGroup } from './getPlayersByGroup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '../config'

export async function addPlayerByGroup(newPlayer: PlayerDTO, group: string) {
  try {
    const storedPlayers = await getPlayersByGroup(group)

    const playerAlreadyExists = storedPlayers.find(
      (player) => player.name === newPlayer.name,
    )

    if (playerAlreadyExists)
      throw new CustomError(
        'Essa pessoa já está adicionada em um time desta turma.',
      )

    const playersToStore = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, playersToStore)
  } catch (error) {
    if (error instanceof CustomError) throw error

    throw new Error()
  }
}
