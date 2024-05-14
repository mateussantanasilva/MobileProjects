import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
  SyncMessage,
} from './styles'
import { BackHeader } from '../../components/BackHeader'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { X } from 'phosphor-react-native'
import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { BSON } from 'realm'
import { Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { getLastSyncTimestamp } from '../../libs/mmkv'
import { stopLocationTask } from '../../tasks/backgroundLocationTask'

interface RouteParams {
  id: string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false)

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

  async function handleRegisterArrival() {
    try {
      if (!historic)
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo.',
        )

      await stopLocationTask()

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

  useEffect(() => {
    const lastSync = getLastSyncTimestamp()

    if (lastSync && historic)
      setDataNotSynced(historic?.updated_at.getTime() > lastSync)
  }, [historic])

  return (
    <Container>
      <BackHeader title={title} />

      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>
      </Content>

      {dataNotSynced && <SyncMessage>Sincronização pendente</SyncMessage>}

      {historic?.status === 'departure' && (
        <Footer>
          <IconButton icon={X} onPress={handleRemoveVehicleInUse} />

          <Button title="Registrar Chegada" onPress={handleRegisterArrival} />
        </Footer>
      )}
    </Container>
  )
}
