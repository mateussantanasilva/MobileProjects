import { useTheme } from 'native-base'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { useEffect, useState } from 'react'
import {
  NotificationWillDisplayEvent,
  OSNotification,
  OneSignal,
} from 'react-native-onesignal'
import { Notification } from '../components/Notification'

export function Routes() {
  const [notification, setNotification] = useState<OSNotification | null>(null)

  const { colors } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  useEffect(() => {
    // creates function to handle with notification and doesn't show default notification
    const handleNotification = (event: NotificationWillDisplayEvent) => {
      event.preventDefault()

      const notificationResponse = event.getNotification()

      setNotification(notificationResponse)
    }

    OneSignal.Notifications.addEventListener(
      'foregroundWillDisplay',
      handleNotification,
    )

    return () =>
      OneSignal.Notifications.removeEventListener(
        'foregroundWillDisplay',
        handleNotification,
      )
  }, [])

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {notification?.title && (
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </NavigationContainer>
  )
}
