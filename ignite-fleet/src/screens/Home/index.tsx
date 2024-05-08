import { useNavigation } from '@react-navigation/native'
import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'
import { Container, Content, Label, Title } from './styles'
import { useQuery, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { HistoricCard } from '../../components/HistoricCard'
import dayjs from 'dayjs'
import { VehicleDTO } from '../../@types/VehicleDTO'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<VehicleDTO[]>([])

  const { navigate } = useNavigation()

  const realm = useRealm()
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

      const formattedHistoric = response.map((vehicle) => {
        return {
          id: vehicle._id.toString(),
          licensePlate: vehicle.license_plate,
          createdAt: dayjs(vehicle.created_at).format(
            '[Saída em] DD/MM/YYYY [às] HH:mm',
          ),
          isSync: false,
        }
      })

      setVehicleHistoric(formattedHistoric)
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Não foi possível carregar o histórico de veículos.')
    }
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

  return (
    <Container>
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
