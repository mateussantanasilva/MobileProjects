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
import { getLastSyncTimestamp, getStoredLocations } from '../../libs/mmkv'
import { stopLocationTask } from '../../tasks/backgroundLocationTask'
import { LatLng } from 'react-native-maps'
import { Map } from '../../components/Map'
import { Locations } from '../../components/Locations'
import { getAddressLocation } from '../../utils/getAddressLocation'
import { LocationContentProps } from '../../components/LocationInfo'
import dayjs from 'dayjs'
import { Loading } from '../../components/Loading'

interface RouteParams {
  id: string
}

export function Arrival() {
  const [isLoading, setIsLoading] = useState(true)

  const [dataNotSynced, setDataNotSynced] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng[]>([])
  const [departure, setDeparture] = useState<LocationContentProps>(
    {} as LocationContentProps,
  )
  const [arrival, setArrival] = useState<LocationContentProps | null>(null)

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
        onPress: async () => {
          // transaction
          realm.write(() => {
            realm.delete(historic)
          })

          await stopLocationTask()

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

      const locations = getStoredLocations()

      // transaction
      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
        historic.coords.push(...locations)
      })

      await stopLocationTask()

      Alert.alert('Chegada', 'A chegada foi registrada com sucesso!')
      goBack()
    } catch (error) {
      console.error(error)
      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  async function getLocationsInfo() {
    if (!historic) return

    const lastSync = getLastSyncTimestamp()
    const updatedAt = historic.updated_at.getTime()

    if (lastSync) setDataNotSynced(updatedAt > lastSync)

    if (historic.status === 'departure') {
      const storedLocations = getStoredLocations()
      setCoordinates(storedLocations)
    } else {
      setCoordinates(historic.coords)
    }

    const departureStreetName = await getAddressLocation(historic.coords[0])
    setDeparture({
      label: `Saindo em ${departureStreetName}`,
      description: dayjs(new Date(historic.coords[0].timestamp)).format(
        'DD/MM/YYYY [às] HH:mm',
      ),
    })

    if (historic.status === 'arrival') {
      const lastLocation = historic.coords[historic.coords.length - 1]
      const arrivalStreetName = await getAddressLocation(lastLocation)

      setArrival({
        label: `Chegando em ${arrivalStreetName}`,
        description: dayjs(new Date(lastLocation.timestamp)).format(
          'DD/MM/YYYY [às] HH:mm',
        ),
      })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getLocationsInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historic])

  if (isLoading) return <Loading />

  return (
    <Container>
      <BackHeader title={title} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <Content>
        <Locations departure={departure} arrival={arrival} />

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
