import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { CustomError } from '@utils/CustomError'
import { api } from '@services/api'
import { useCallback, useEffect, useState } from 'react'
import { ExerciseDTO } from 'src/@types/ExerciseDTO'
import { Loading } from '@components/Loading'
import { ExerciseRegisterButton } from '@components/ExerciseRegisterButton'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

interface ExerciseRouteParams {
  id: string
}

export function Exercise() {
  const route = useRoute()
  const { id } = route.params as ExerciseRouteParams

  const { goBack } = useNavigation()

  const [isLoading, setIsLoading] = useState(true)

  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const toast = useToast()

  const fetchExerciseDetails = useCallback(async () => {
    try {
      setIsLoading(true)

      const response = await api.get(`/exercises/${id}`)

      setExercise(response.data)
    } catch (error) {
      const isCustomError = error instanceof CustomError
      const title = isCustomError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        textAlign: 'center',
        bgColor: 'red.600',
      })
    } finally {
      setIsLoading(false)
    }
  }, [id, toast])

  useEffect(() => {
    fetchExerciseDetails()
  }, [fetchExerciseDetails])

  return (
    <VStack flex="1">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <VStack px="8" bg="gray.600" pt="12">
            <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
              <Icon as={Feather} name="arrow-left" color="green.500" size="6" />
            </TouchableOpacity>

            <HStack
              justifyContent="space-between"
              mt="4"
              mb="8"
              alignItems="center"
            >
              <Heading
                color="gray.100"
                fontSize="lg"
                fontFamily="heading"
                mr="2"
                flex="1"
              >
                {exercise.name}
              </Heading>

              <HStack alignItems="center">
                <BodySvg />
                <Text color="gray.200" textTransform="capitalize" ml="1">
                  {exercise.group}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <ScrollView>
            <VStack p="8">
              <Box rounded="lg" mb="3" overflow="hidden">
                <Image
                  source={{
                    uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                  }}
                  alt={`Demonstração do exercício ${exercise.name}`}
                  w="full"
                  h="80"
                  resizeMode="cover"
                />
              </Box>

              <Box bg="gray.600" rounded="md" pt="5" px="4" pb="4">
                <HStack
                  alignItems="center"
                  justifyContent="space-evenly"
                  mb="6"
                >
                  <HStack alignItems="center">
                    <SeriesSvg />
                    <Text color="gray.200" ml="2">
                      {exercise.series} séries
                    </Text>
                  </HStack>

                  <HStack alignItems="center">
                    <RepetitionsSvg />
                    <Text color="gray.200" ml="2">
                      {exercise.repetitions} repetições
                    </Text>
                  </HStack>
                </HStack>

                <ExerciseRegisterButton exerciseId={id} />
              </Box>
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  )
}
