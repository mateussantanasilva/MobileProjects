import { HStack, Heading, Icon, Text, VStack } from 'native-base'
import { Avatar } from './Avatar'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function HomeHeader() {
  return (
    <HStack bgColor="gray.600" pt="16" pb="5" px="8" alignItems="center">
      <Avatar
        source={{ uri: 'https://github.com/mateussantanasilva.png' }}
        size={16}
        mr="4"
      />

      <VStack flex="1">
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Mateus
        </Heading>
      </VStack>

      <TouchableOpacity activeOpacity={0.7}>
        {/* uses Icon as={library} to select the icon and use style props */}
        <Icon as={MaterialIcons} name="logout" color="gray.200" size="7" />
      </TouchableOpacity>
    </HStack>
  )
}
