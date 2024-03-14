import { Header } from '@components/Header'
import { GroupsContainer } from './styles'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { EmptyList } from '@components/EmptyList'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const { navigate } = useNavigation()

  function handleNavigateToNewGroup() {
    navigate('new-group')
  }

  return (
    <GroupsContainer>
      <Header />

      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={() => (
          <EmptyList message="Que tal cadastrar a primeira turma?" />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          groups.length === 0 && { flex: 1 },
        ]}
        showsVerticalScrollIndicator={false}
      />

      <Button title="Criar nova turma" onPress={handleNavigateToNewGroup} />
    </GroupsContainer>
  )
}
