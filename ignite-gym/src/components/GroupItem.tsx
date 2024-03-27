import { IPressableProps, Pressable, Text } from 'native-base'

interface GroupItemProps extends IPressableProps {
  name: string
  isActive?: boolean
}

export function GroupItem({
  name,
  isActive = false,
  ...props
}: GroupItemProps) {
  return (
    <Pressable
      mr="3"
      w="24"
      h="10"
      bg="gray.600"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{
        borderWidth: '1',
        borderColor: 'green.500',
      }}
      {...props}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  )
}
