import { getPlayersByGroup } from './getPlayersByGroup'

export async function getPlayersByGroupAndTeam(group: string, team: string) {
  try {
    const storedPlayers = await getPlayersByGroup(group)

    const filteredPlayers = storedPlayers.filter(
      (player) => player.team === team,
    )

    return filteredPlayers
  } catch (error) {
    if (error instanceof Error) throw error

    throw new Error()
  }
}
