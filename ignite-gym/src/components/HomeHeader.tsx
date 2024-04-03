import { HStack, Heading, Icon, Text, VStack } from 'native-base'
import { Avatar } from './Avatar'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'

import userPhotoDefaultImage from '@assets/userPhotoDefault.png'

export function HomeHeader() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <HStack bgColor="gray.600" pt="16" pb="5" px="8" alignItems="center">
      <Avatar
        source={user.avatar ? { uri: user.avatar } : userPhotoDefaultImage}
        alt={`Imagem de perfil de ${user.name}`}
        size={16}
        mr="4"
      />

      <VStack flex="1">
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity activeOpacity={0.7} onPress={signOut}>
        {/* uses Icon as={library} to select the icon and use style props */}
        <Icon as={MaterialIcons} name="logout" color="gray.200" size="7" />
      </TouchableOpacity>
    </HStack>
  )
}
