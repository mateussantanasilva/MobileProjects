import {
  HStack,
  Text,
  IconButton,
  CloseIcon,
  Icon,
  Pressable,
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { OSNotification } from 'react-native-onesignal'

interface NotificationProps {
  notification: OSNotification
  onClose: () => void
}

interface AdditionalDataType {
  route?: string
  productId?: string
}

export function Notification({ notification, onClose }: NotificationProps) {
  const { navigate } = useNavigation()

  function handleShowDetails() {
    const { route, productId } =
      notification.additionalData as AdditionalDataType

    if (route === 'details' && productId) {
      navigate('details', { productId })
      onClose()
    }
  }

  return (
    <Pressable
      w="full"
      p={4}
      pt={12}
      bgColor="gray.200"
      position="absolute"
      top={0}
      onPress={handleShowDetails}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Icon
          as={Ionicons}
          name="notifications-outline"
          size={5}
          color="black"
          mr={2}
        />

        <Text fontSize="md" color="black" flex={1}>
          {notification.title}
        </Text>

        <IconButton
          variant="unstyled"
          _focus={{ borderWidth: 0 }}
          icon={<CloseIcon size="3" />}
          _icon={{ color: 'coolGray.600' }}
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  )
}
