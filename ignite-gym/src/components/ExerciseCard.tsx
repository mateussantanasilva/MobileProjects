import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { ExerciseDTO } from 'src/@types/ExerciseDTO'
import { api } from '@services/api'

interface ExerciseCardProps extends TouchableOpacityProps {
  exercise: ExerciseDTO
}

export function ExerciseCard({ exercise, ...props }: ExerciseCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p="2"
        pr="4"
        rounded="md"
        mb="3"
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
          }}
          alt={`Imagem do exercício ${exercise.name}`}
          resizeMode="cover"
          w="16"
          h="16"
          rounded="md"
          mr="4"
        />

        <VStack flex="1">
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {exercise.name}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt="1" numberOfLines={2}>
            {exercise.series} séries x {exercise.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
