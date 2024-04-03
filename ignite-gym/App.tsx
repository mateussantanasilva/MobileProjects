import { Loading } from '@components/Loading'
import { AuthProvider } from '@contexts/AuthContext'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Routes } from '@routes/index'
import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'
import { THEME } from 'src/theme'

export default function App() {
  const [loadedFonts] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthProvider>{loadedFonts ? <Routes /> : <Loading />}</AuthProvider>
    </NativeBaseProvider>
  )
}
