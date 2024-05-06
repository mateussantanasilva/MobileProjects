import { TouchableOpacity } from 'react-native'
import {
  Container,
  Greeting,
  Message,
  Name,
  Picture,
  PowerIcon,
} from './styles'
import { useApp, useUser } from '@realm/react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function HomeHeader() {
  const user = useUser()
  const app = useApp()

  const insets = useSafeAreaInsets() // works in IOS and Android
  const paddingTop = insets.top + 32

  function handleLogout() {
    app.currentUser?.logOut()
  }

  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: user.profile.pictureUrl }}
        placeholder="L184i9kCW=of00ayjZay~qj[ayjt"
      />

      <Greeting>
        <Message>Olá</Message>

        <Name>{user.profile.name}</Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <PowerIcon />
      </TouchableOpacity>
    </Container>
  )
}
