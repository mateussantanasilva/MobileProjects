import { ThemeProvider } from 'styled-components/native'
import { SignIn } from './src/screens/SignIn'
import theme from './src/theme'
import { StatusBar } from 'react-native'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading'

export default function App() {
  const [loadedFonts] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!loadedFonts) return <Loading />

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <SignIn />
    </ThemeProvider>
  )
}
