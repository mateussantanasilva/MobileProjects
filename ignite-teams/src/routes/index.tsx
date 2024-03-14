import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'

// navigation context - provider
export function Routes() {
  const { COLORS } = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaView>
  )
}
