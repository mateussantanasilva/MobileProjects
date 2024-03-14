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
import { FlatList } from 'react-native'
import { useState } from 'react'
import { PlayerCard } from '@components/PlayerCard'
import { EmptyList } from '@components/EmptyList'
import { Button } from '@components/Button'
import { useRoute } from '@react-navigation/native'

interface PlayersRouteParams {
  group: string
}

export function Players() {
  const [selectedTeam, setSelectedTeam] = useState('Time A')
  const [players, setPlayers] = useState<string[]>([])

  const route = useRoute()
  const { group } = route.params as PlayersRouteParams

  return (
    <PlayersContainer>
      <Header showBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <PlayersForm>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />

        <ButtonIcon icon="add" />
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

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => null} />
        )}
        ListEmptyComponent={<EmptyList message="Não há pessoas nesse time." />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover turma" variant="SECONDARY" />
    </PlayersContainer>
  )
}
