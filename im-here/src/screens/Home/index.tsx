import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './styles'
import { Participant } from '../../components/Participant'
import { ListEmpty } from '../../components/ListEmpty'
import { useState } from 'react'

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleAddParticipant() {
    if (participants.includes(participantName))
      // pode usar o console.warn ou console.error para exibir no app - LOG BOX
      return Alert.alert(
        'Participante já existe',
        'A lista já possui um participante com este nome. Adicione o nome completo.',
      )

    setParticipants((prevState) => [...prevState, participantName])
    setParticipantName('')
  }

  function handleRemoveParticipant(name: string) {
    Alert.alert('Remover', `Deseja remover o participante ${name}?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name),
          ),
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congresso de Tecnologia</Text>
      <Text style={styles.description}>Encontro de palestrantes.</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Nome do participante"
          value={participantName}
          onChangeText={setParticipantName}
          placeholderTextColor="#6B6B6B"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleAddParticipant}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleRemoveParticipant(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmpty}
      />
    </View>
  )
}
