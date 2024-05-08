import { useRef, useState } from 'react'
import { BackHeader } from '../../components/BackHeader'
import { Button } from '../../components/Button'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import { Container, Content } from './styles'
import { Alert, ScrollView, TextInput } from 'react-native'
import { validateLicensePlate } from '../../utils/validateLicensePlate'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { useUser } from '@realm/react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function Departure() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')

  const licensePlateInputRef = useRef<TextInput>(null)
  const descriptionInputRef = useRef<TextInput>(null)

  const realm = useRealm()
  const user = useUser()

  const { goBack } = useNavigation()

  function handleRegisterDeparture() {
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

      setIsRegistering(true)

      // transaction (CREATE)
      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user.id,
            license_plate: licensePlate.toUpperCase(),
            description,
          }),
        )
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!')
      goBack()
    } catch (error) {
      setIsRegistering(false)
      console.error(error)
      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.')
    }
  }

  return (
    <Container>
      <BackHeader title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Content>
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
    </Container>
  )
}
