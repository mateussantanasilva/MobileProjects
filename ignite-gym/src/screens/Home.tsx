import { ExerciseCard } from '@components/ExerciseCard'
import { GroupItem } from '@components/GroupItem'
import { HomeHeader } from '@components/HomeHeader'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'
import { useState } from 'react'

export function Home() {
  const [selectedGroup, setSelectedGroup] = useState('costas')

  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  const GROUPS = ['costas', 'bíceps', 'tríceps', 'ombro']

  const EXERCISES = ['Puxada frontal', 'Remada curvada', 'Remada unilateral']

  return (
    <VStack flex="1">
      <HomeHeader />

      <FlatList
        data={GROUPS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupItem
            name={item}
            isActive={selectedGroup === item}
            onPress={() => setSelectedGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my="10"
        maxH="10"
        minH="10"
      />

      <VStack flex="1" px="8">
        <HStack justifyContent="space-between" mb="5">
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>

        <FlatList
          data={EXERCISES}
          keyExtractor={(item) => item}
          renderItem={() => (
            <ExerciseCard onPress={() => navigate('exercise')} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 20 }}
        />
      </VStack>
    </VStack>
  )
}
