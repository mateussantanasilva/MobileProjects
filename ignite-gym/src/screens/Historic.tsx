import { HistoricCard } from '@components/HistoricCard'
import { Loading } from '@components/Loading'
import { ScreenHeader } from '@components/ScreenHeader'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { CustomError } from '@utils/CustomError'
import { Heading, SectionList, Text, VStack, useToast } from 'native-base'
import { useCallback, useState } from 'react'
import { HistoricDTO } from 'src/@types/HistoricDTO'

interface HistoricPerDay {
  title: string
  data: HistoricDTO[]
}

export function Historic() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoricPerDay[]>([])

  const toast = useToast()

  const fetchHistoric = useCallback(async () => {
    try {
      setIsLoading(true)

      const response = await api.get('/history')

      setExercises(response.data)
    } catch (error) {
      const isCustomError = error instanceof CustomError
      const title = isCustomError
        ? error.message
        : 'Não foi possível carregar o histórico. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        textAlign: 'center',
        bgColor: 'red.600',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useFocusEffect(
    useCallback(() => {
      fetchHistoric()
    }, [fetchHistoric]),
  )

  return (
    <VStack flex="1">
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              fontFamily="heading"
              mt="10"
              mb="3"
            >
              {section.title}
            </Heading>
          )}
          renderItem={({ item }) => <HistoricCard exerciseDone={item} />}
          ListEmptyComponent={() => (
            <Text textAlign="center" color="gray.100">
              Não há exercícios registrados ainda. {'\n'} Vamos treinar hoje?
            </Text>
          )}
          contentContainerStyle={
            !exercises.length && { flex: 1, justifyContent: 'center' }
          }
          showsVerticalScrollIndicator={false}
          px="8"
        />
      )}
    </VStack>
  )
}
