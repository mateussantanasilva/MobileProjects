import { HistoricCard } from '@components/HistoricCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, SectionList, Text, VStack } from 'native-base'

export function Historic() {
  const EXERCISES = [
    {
      title: '26.08.22',
      data: ['Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '27.08.22',
      data: ['Puxada frontal'],
    },
  ]

  return (
    <VStack flex="1">
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={EXERCISES}
        keyExtractor={(item) => item}
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
        renderItem={() => <HistoricCard />}
        ListEmptyComponent={() => (
          <Text textAlign="center" color="gray.100">
            Não há exercícios registrados ainda. {'\n'} Vamos treinar hoje?
          </Text>
        )}
        contentContainerStyle={
          !EXERCISES.length && { flex: 1, justifyContent: 'center' }
        }
        showsVerticalScrollIndicator={false}
        px="8"
      />
    </VStack>
  )
}
