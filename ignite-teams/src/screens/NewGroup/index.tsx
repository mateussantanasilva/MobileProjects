import { Header } from '@components/Header'
import { NewGroupContainer, NewGroupContent, NewGroupIcon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Alert } from 'react-native'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const { navigate } = useNavigation()

  function handleCreateGroup() {
    if (!group)
      return Alert.alert(
        'Preencha o campo',
        'Digite o nome do grupo para adicionar.',
      )

    navigate('players', { group })
    setGroup('')
  }

  return (
    <NewGroupContainer>
      <Header showBackButton />

      <NewGroupContent>
        <NewGroupIcon />

        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          value={group}
          onChangeText={setGroup}
        />

        <Button
          title="Criar"
          onPress={handleCreateGroup}
          style={{ marginTop: 20 }}
        />
      </NewGroupContent>
    </NewGroupContainer>
  )
}
