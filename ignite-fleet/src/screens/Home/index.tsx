import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { VehicleDTO } from '../../@types/VehicleDTO'
import { useUser } from '@realm/react'
import { ProgressDirection, ProgressMode } from 'realm'
import { useQuery, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { getLastSyncTimestamp, saveLastSyncTimestamp } from '../../libs/mmkv'
import Toast from 'react-native-toast-message'
import { CloudArrowUp } from 'phosphor-react-native'
import { Container, Content, Label, Title } from './styles'
import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'
import { HistoricCard } from '../../components/HistoricCard'
import { TopMessage } from '../../components/TopMessage'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<VehicleDTO[]>([])
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null)

  const { navigate } = useNavigation()

  const realm = useRealm()
  const user = useUser()
  const historic = useQuery(Historic)

  function handleRegisterMovement() {
    if (vehicleInUse?._id)
      return navigate('arrival', { id: vehicleInUse._id.toString() })

    navigate('departure')
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered('status = "departure"')[0]

      setVehicleInUse(vehicle)
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Veículo em uso',
        'Não foi possível carregar o veículo em uso.',
      )
    }
  }

  function fetchHistoric() {
    try {
      const response = historic.filtered(
        'status = "arrival" SORT(created_at DESC)',
      )

      const lastSync = getLastSyncTimestamp()

      const formattedHistoric = response.map((vehicle) => {
        return {
          id: vehicle._id.toString(),
          licensePlate: vehicle.license_plate,
          createdAt: dayjs(vehicle.created_at).format(
            '[Saída em] DD/MM/YYYY [às] HH:mm',
          ),
          isSync:
            (lastSync && lastSync > vehicle.updated_at.getTime()) || false,
        }
      })

      setVehicleHistoric(formattedHistoric)
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Não foi possível carregar o histórico de veículos.')
    }
  }

  function notifyProgress(transferred: number, transfeable: number) {
    const percentage = (transferred / transfeable) * 100

    if (percentage === 100) {
      saveLastSyncTimestamp()
      fetchHistoric()
      setPercentageToSync(null)

      Toast.show({
        type: 'info',
        text1: 'Todos os dados estão sincronizados.',
      })
    }

    setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`)
  }

  useEffect(() => {
    fetchVehicleInUse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    // remove the listener when unmounting the component
    return () => {
      // not disconnected
      if (realm && !realm.isClosed)
        realm.removeListener('change', fetchVehicleInUse)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchHistoric()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historic])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects('Historic')
        .filtered(`user_id = "${user.id}"`)

      // data synchronization
      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' })
    })
  }, [realm, user.id])

  useEffect(() => {
    const syncSession = realm.syncSession

    if (!syncSession) return

    syncSession.addProgressNotification(
      ProgressDirection.Upload,
      ProgressMode.ReportIndefinitely,
      notifyProgress,
    )

    return () => syncSession.removeProgressNotification(notifyProgress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      {percentageToSync && (
        <TopMessage title={percentageToSync} icon={CloudArrowUp} />
      )}

      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Title>Histórico</Title>

        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => navigate('arrival', { id: item.id })}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Label>Nenhum veículo foi utilizado.</Label>}
        />
      </Content>
    </Container>
  )
}
