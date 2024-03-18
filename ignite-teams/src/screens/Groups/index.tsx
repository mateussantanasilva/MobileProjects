import { Header } from '@components/Header'
import { GroupsContainer } from './styles'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { EmptyList } from '@components/EmptyList'
import { Button } from '@components/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getAllGroups } from 'src/storages/groups/getAllGroups'
import { Loading } from '@components/Loading'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { navigate } = useNavigation()

  function handleNavigateToNewGroup() {
    navigate('new-group')
  }

  function handleOpenGroup(group: string) {
    navigate('players', { group })
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const storedGroups = await getAllGroups()
      setGroups(storedGroups)
    } catch (error) {
      if (error instanceof Error) throw error
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <GroupsContainer>
      <Header />

      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          ListEmptyComponent={() => (
            <EmptyList message="Que tal cadastrar a primeira turma?" />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            groups.length === 0 && { flex: 1 },
          ]}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNavigateToNewGroup} />
    </GroupsContainer>
  )
}
