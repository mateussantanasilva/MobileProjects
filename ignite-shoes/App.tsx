import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Routes } from './src/routes'

import { THEME } from './src/theme'
import { Loading } from './src/components/Loading'

import { CartContextProvider } from './src/contexts/CartContext'
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal'
import Constants from 'expo-constants'
import { createTagUserInfo } from './src/notifications/tags'
import { useEffect } from 'react'

OneSignal.initialize(Constants.expoConfig?.extra?.oneSignalAppId)
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  createTagUserInfo()

  useEffect(() => {
    const handleClickNotification = (event: NotificationClickEvent) => {
      switch (event.result.actionId) {
        case '1':
          console.log('Ver todas')
          break

        case '2':
          console.log('Ver pedido')
          break

        default:
          console.log('Nenhum botão selecionado')
          break
      }
    }

    OneSignal.Notifications.addEventListener('click', handleClickNotification)

    return () =>
      OneSignal.Notifications.removeEventListener(
        'click',
        handleClickNotification,
      )
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  )
}
