import { useEffect, useRef, useState } from 'react'
import { BackHeader } from '../../components/BackHeader'
import { Button } from '../../components/Button'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import { Container, Content, MessageContent, PermissionMessage } from './styles'
import { Alert, ScrollView, TextInput } from 'react-native'
import { validateLicensePlate } from '../../utils/validateLicensePlate'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { useUser } from '@realm/react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  LocationSubscription,
  LocationAccuracy,
  useForegroundPermissions,
  watchPositionAsync,
  LocationObjectCoords,
  requestBackgroundPermissionsAsync,
} from 'expo-location'
import { getAddressLocation } from '../../utils/getAddressLocation'
import { Loading } from '../../components/Loading'
import { LocationInfo } from '../../components/LocationInfo'
import { Car } from 'phosphor-react-native'
import { Map } from '../../components/Map'
import { startLocationTask } from '../../tasks/backgroundLocationTask'
import { openSettings } from '../../utils/openSettings'

export function Departure() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')

  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentCoords, setCurrentCoords] =
    useState<LocationObjectCoords | null>(null)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [permissionStatus, requestPermission] = useForegroundPermissions()

  const licensePlateInputRef = useRef<TextInput>(null)
  const descriptionInputRef = useRef<TextInput>(null)

  const realm = useRealm()
  const user = useUser()

  const { goBack } = useNavigation()

  async function handleRegisterDeparture() {
    try {
      if (!validateLicensePlate(licensePlate)) {
        licensePlateInputRef.current?.focus()

        return Alert.alert(
          'Placa inválida',
          'Por favor, informe a placa correta do veículo.',
        )
      }

      if (description.trim().length === 0) {
        descriptionInputRef.current?.focus()

        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade da utilização do veículo.',
        )
      }

      if (!currentCoords?.latitude && !currentCoords?.longitude)
        return Alert.alert(
          'Localização',
          'Não foi possível obter a localização atual. Tente novamente.',
        )

      setIsRegistering(true)

      const backgroundPermissions = await requestBackgroundPermissionsAsync()

      if (!backgroundPermissions) {
        setIsRegistering(false)

        return Alert.alert(
          'Localização',
          'É necessário permitir o acesso a localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo".',
          [
            {
              text: 'Abrir configurações',
              onPress: openSettings,
            },
          ],
        )
      }

      await startLocationTask()

      // transaction (CREATE)
      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user.id,
            license_plate: licensePlate.toUpperCase(),
            description,
            coords: [
              {
                latitude: currentCoords.latitude,
                longitude: currentCoords.longitude,
                timestamp: new Date().getTime(),
              },
            ],
          }),
        )
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!')
      setIsRegistering(false)
      goBack()
    } catch (error) {
      setIsRegistering(false)
      console.error(error)
      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.')
    }
  }

  useEffect(() => {
    requestPermission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!permissionStatus?.granted) return

    let subscription: LocationSubscription

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        setCurrentCoords(location.coords)

        getAddressLocation(location.coords)
          .then((address) => address && setCurrentAddress(address))
          .finally(() => setIsLoadingLocation(false))
      },
    ).then((response) => (subscription = response))

    // removes the listener when unmounting the component
    return () => subscription && subscription.remove()
  }, [permissionStatus])

  if (isLoadingLocation) return <Loading />

  return (
    <Container>
      <BackHeader title="Saída" />

      {!permissionStatus?.granted ? (
        <MessageContent>
          <PermissionMessage>
            Você precisa permitir que o aplicativo tenha acesso a localização
            para utilizar essa funcionalidade. Por favor, acesse as
            configurações do seu dispositivo para conceder essa permissão.
          </PermissionMessage>

          <Button title="Abrir configurações" onPress={openSettings} />
        </MessageContent>
      ) : (
        <KeyboardAwareScrollView extraHeight={100}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {currentCoords && <Map coordinates={[currentCoords]} />}

            <Content>
              {currentAddress && (
                <LocationInfo
                  icon={Car}
                  label="Localização atual"
                  description={currentAddress}
                />
              )}

              <LicensePlateInput
                ref={licensePlateInputRef}
                label="Placa do veículo"
                placeholder="BRA1234"
                returnKeyType="next"
                onSubmitEditing={() => descriptionInputRef.current?.focus()}
                onChangeText={setLicensePlate}
              />

              <TextAreaInput
                ref={descriptionInputRef}
                label="Finalidade"
                placeholder="Vou utilizar o carro para..."
                returnKeyType="send"
                blurOnSubmit // for multiline
                onSubmitEditing={handleRegisterDeparture}
                onChangeText={setDescription}
              />

              <Button
                title="Registrar Saída"
                isLoading={isRegistering}
                onPress={handleRegisterDeparture}
              />
            </Content>
          </ScrollView>
        </KeyboardAwareScrollView>
      )}
    </Container>
  )
}
