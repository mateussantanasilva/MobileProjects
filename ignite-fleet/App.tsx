import 'react-native-get-random-values'
import './src/libs/dayjs'

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
import { AppProvider, UserProvider } from '@realm/react'
import { REALM_APP_ID } from '@env'
import { Routes } from './src/routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RealmProvider } from './src/libs/realm'

export default function App() {
  const [loadedFonts] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!loadedFonts) return <Loading />

  return (
    // REALM_APP_ID = MongoDB Atlas/App Service/Application/Copy ID
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          {/* if the user is not logged in it will call fallback  */}
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
