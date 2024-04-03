import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { Exercise } from '@screens/Exercise'
import { Historic } from '@screens/Historic'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'

import HomeSvg from '@assets/home.svg'
import HistoricSvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'

type AppRoutes = {
  home: undefined // route name: parameter
  historic: undefined
  profile: undefined
  exercise: {
    id: string
  }
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  return (
    // the order influences the navigation
    // hides header globally
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingTop: sizes[6],
          paddingBottom: sizes[10],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="historic"
        component={Historic}
        options={{
          tabBarIcon: ({ color }) => (
            <HistoricSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }} // hides option in menu
      />
    </Navigator>
  )
}
