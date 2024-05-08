import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'
import { BackHeader } from '../../components/BackHeader'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { X } from 'phosphor-react-native'
import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { BSON } from 'realm'
import { Alert } from 'react-native'

interface RouteParams {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParams

  const { goBack } = useNavigation()

  const realm = useRealm()
  const historic = useObject(Historic, new BSON.UUID(id))

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

  function handleRemoveVehicleInUse() {
    Alert.alert('Cancelar', 'Deseja cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => {
          // transaction
          realm.write(() => {
            realm.delete(historic)
          })

          goBack()
        },
      },
    ])
  }

  function handleRegisterArrival() {
    try {
      if (!historic)
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo.',
        )

      // transaction
      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
      })

      Alert.alert('Chegada', 'A chegada foi registrada com sucesso!')
      goBack()
    } catch (error) {
      console.error(error)
      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  return (
    <Container>
      <BackHeader title={title} />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>
      </Content>

      {historic?.status === 'departure' && (
        <Footer>
          <IconButton icon={X} onPress={handleRemoveVehicleInUse} />

          <Button title="Registrar Chegada" onPress={handleRegisterArrival} />
        </Footer>
      )}
    </Container>
  )
}
