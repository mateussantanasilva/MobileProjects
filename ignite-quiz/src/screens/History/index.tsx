import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, ScrollView, Alert } from 'react-native'
import { HouseLine, Trash } from 'phosphor-react-native'

import { Header } from '../../components/Header'
import { HistoryCard, HistoryProps } from '../../components/HistoryCard'

import { styles } from './styles'
import { historyGetAll, historyRemove } from '../../storage/quizHistoryStorage'
import { Loading } from '../../components/Loading'
import Animated, {
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated'
import { Swipeable } from 'react-native-gesture-handler'
import { THEME } from '../../styles/theme'

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [history, setHistory] = useState<HistoryProps[]>([])

  const swipeableRefs = useRef<Swipeable[]>([])

  const { goBack } = useNavigation()

  async function fetchHistory() {
    const response = await historyGetAll()
    setHistory(response)
    setIsLoading(false)
  }

  function handleRemove(id: string, index: number) {
    swipeableRefs.current?.[index].close()

    Alert.alert('Remover', 'Deseja remover esse registro?', [
      {
        text: 'Sim',
        onPress: async () => {
          await historyRemove(id)

          fetchHistory()
        },
      },
      { text: 'Não', style: 'cancel' },
    ])
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  if (isLoading) return <Loading />

  return (
    <View style={styles.container}>
      <Header
        title="Histórico"
        subtitle={`Seu histórico de estudos${'\n'}realizados`}
        icon={HouseLine}
        onPress={goBack}
      />

      <ScrollView
        contentContainerStyle={styles.history}
        showsVerticalScrollIndicator={false}
      >
        {history.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={SlideInRight.delay(index * 100)}
            exiting={SlideOutLeft}
            layout={LinearTransition.springify()}
          >
            <Swipeable
              ref={(ref) => {
                ref && swipeableRefs.current.push(ref)
              }}
              overshootRight={false} // prevents scrolling to the end
              containerStyle={styles.swipeableCotainer}
              rightThreshold={30} // min size required to run 'onSwipeableOpen'
              onSwipeableOpen={() => handleRemove(item.id, index)} // swipe instead of pressing
              renderRightActions={() => (
                <View style={styles.swipeableButton}>
                  <Trash size={30} color={THEME.COLORS.GREY_100} />
                </View>
              )}
              renderLeftActions={() => null} // prevents on IOS
            >
              <HistoryCard data={item} />
            </Swipeable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  )
}
