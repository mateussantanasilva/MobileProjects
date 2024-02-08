import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

interface HeaderProps {
  title: string
  cartQuantityItems?: number
}

export function Header({ title, cartQuantityItems = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image
          source={require('@/assets/logo.png')}
          alt="Logo escrita expert com um brilho ao lado"
          className="h-6 w-32"
        />

        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>

      {cartQuantityItems > 0 && (
        <TouchableOpacity activeOpacity={0.7} className="relative">
          <View className="bg-lime-300 w-5 h-5 rounded-full items-center top-2 z-10 -right-2.5 justify-center">
            <Text className="text-slate-900 font-bold text-xs">
              {cartQuantityItems}
            </Text>
          </View>

          <Feather name="shopping-bag" color={colors.white} size={24} />
        </TouchableOpacity>
      )}
    </View>
  )
}
