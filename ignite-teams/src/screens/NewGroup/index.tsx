import { Header } from '@components/Header'
import { NewGroupContainer, NewGroupContent, NewGroupIcon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Alert } from 'react-native'
import { createGroup } from 'src/storages/groups/createGroup'
import { CustomError } from '@utils/CustomError'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const { navigate } = useNavigation()

  async function handleCreateGroup() {
    if (!group.trim())
      return Alert.alert('Nova Turma', 'Digite o nome da turma para adicionar.')

    try {
      await createGroup(group)

      navigate('players', { group })

      setGroup('')
    } catch (error) {
      if (error instanceof CustomError)
        return Alert.alert('Nova Turma', error.message)

      Alert.alert('Nova Turma', 'Não foi possível cadastrar uma nova turma.')
      throw error
    }
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
