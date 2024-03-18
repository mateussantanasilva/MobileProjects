import { Header } from '@components/Header'
import {
  PlayersContainer,
  PlayersForm,
  PlayersHeaderList,
  PlayersQuantity,
} from './styles'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { Alert, FlatList, TextInput } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PlayerCard } from '@components/PlayerCard'
import { EmptyList } from '@components/EmptyList'
import { Button } from '@components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { addPlayerByGroup } from 'src/storages/players/addPlayerByGroup'
import { PlayerDTO } from 'src/storages/players/PlayerDTO'
import { CustomError } from '@utils/CustomError'
import { getPlayersByGroupAndTeam } from 'src/storages/players/getPlayersByGroupAndTeam'
import { removePlayerByGroup } from 'src/storages/players/removePlayerByGroup'
import { removeGroup } from 'src/storages/groups/removeGroup'
import { Loading } from '@components/Loading'

interface PlayersRouteParams {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)

  const { navigate } = useNavigation()
  const route = useRoute()
  const { group } = route.params as PlayersRouteParams

  const [selectedTeam, setSelectedTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerDTO[]>([])

  const [newPlayer, setNewPlayer] = useState('')

  const newPlayerInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayer.trim().length === 0)
      return Alert.alert(
        'Nova Pessoa',
        'Digite o nome da pessoa para adicionar.',
      )

    const newPlayerToAdd: PlayerDTO = {
      name: newPlayer,
      team: selectedTeam,
    }

    try {
      await addPlayerByGroup(newPlayerToAdd, group)
      await fetchPlayersByTeam()

      newPlayerInputRef.current?.blur()
      setNewPlayer('')
    } catch (error) {
      if (error instanceof CustomError)
        return Alert.alert('Nova Pessoa', error.message)

      Alert.alert('Nova Pessoa', 'Não foi possível adicionar uma nova pessoa.')

      throw error
    }
  }

  async function handleRemovePlayer(player: string) {
    try {
      await removePlayerByGroup(player, group)
      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Remover Pessoa', 'Não foi possível remover essa pessoa.')

        throw error
      }
    }
  }

  async function handleRemoveGroup() {
    Alert.alert('Remover Turma', `Deseja remover a turma ${group}?`, [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await removeGroup(group)

            navigate('groups')
          } catch (error) {
            Alert.alert('Remover Turma', 'Não foi possível remover essa turma.')

            throw error
          }
        },
      },
    ])
  }

  const fetchPlayersByTeam = useCallback(async () => {
    try {
      setIsLoading(true)

      const storedPlayers = await getPlayersByGroupAndTeam(group, selectedTeam)
      setPlayers(storedPlayers)
    } catch (error) {
      if (error instanceof Error) throw error
    } finally {
      setIsLoading(false)
    }
  }, [group, selectedTeam])

  useEffect(() => {
    fetchPlayersByTeam()
  }, [fetchPlayersByTeam, selectedTeam])

  return (
    <PlayersContainer>
      <Header showBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <PlayersForm>
        <Input
          ref={newPlayerInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayer}
          onChangeText={setNewPlayer}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </PlayersForm>

      <PlayersHeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === selectedTeam}
              onPress={() => setSelectedTeam(item)}
            />
          )}
          horizontal
        />

        <PlayersQuantity>{players.length}</PlayersQuantity>
      </PlayersHeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={
            <EmptyList message="Não há pessoas nesse time." />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover turma"
        variant="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </PlayersContainer>
  )
}
