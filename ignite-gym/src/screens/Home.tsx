import { ExerciseCard } from '@components/ExerciseCard'
import { GroupList } from '@components/GroupList'
import { HomeHeader } from '@components/HomeHeader'
import { Loading } from '@components/Loading'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { CustomError } from '@utils/CustomError'
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base'
import { useCallback, useState } from 'react'
import { ExerciseDTO } from 'src/@types/ExerciseDTO'

export function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const [selectedGroup, setSelectedGroup] = useState('antebraço')
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])

  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  const toast = useToast()

  const fetchExercisesByGroup = useCallback(async () => {
    try {
      const response = await api.get(`/exercises/bygroup/${selectedGroup}`)

      setExercises(response.data)
    } catch (error) {
      const isCustomError = error instanceof CustomError
      const title = isCustomError
        ? error.message
        : 'Não foi possível carregar os exercícios. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        textAlign: 'center',
        bgColor: 'red.600',
      })
    }
  }, [selectedGroup, toast])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [fetchExercisesByGroup]),
  )

  return (
    <VStack flex="1">
      <HomeHeader />

      <GroupList
        selectedGroup={selectedGroup}
        onSetSelectedGroup={setSelectedGroup}
        onSetIsLoading={setIsLoading}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex="1" px="8">
          <HStack justifyContent="space-between" mb="5">
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                exercise={item}
                onPress={() => navigate('exercise', { id: item.id })}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 20 }}
          />
        </VStack>
      )}
    </VStack>
  )
}
