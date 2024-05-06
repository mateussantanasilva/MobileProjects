import { Container, Slogan, Title } from './styles'

import BackgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import { useState } from 'react'
import { Alert } from 'react-native'
import { useApp, Realm } from '@realm/react'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const app = useApp()

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()

      if (!idToken)
        return Alert.alert(
          'Entrar',
          'Não foi possível conectar-se a sua conta google.',
        )

      const credentials = Realm.Credentials.jwt(idToken)
      await app.logIn(credentials) // send to MongoDB Atlas
    } catch (error) {
      Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.')
      console.error(error)
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <Container source={BackgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  )
}
