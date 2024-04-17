import { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'

import { styles } from './styles'

import { QUIZ } from '../../data/quiz'
import { historyAdd } from '../../storage/quizHistoryStorage'

import { Loading } from '../../components/Loading'
import { Question } from '../../components/Question'
import { QuizHeader } from '../../components/QuizHeader'
import { ConfirmButton } from '../../components/ConfirmButton'
import { OutlineButton } from '../../components/OutlineButton'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

interface Params {
  id: string
}

type QuizProps = (typeof QUIZ)[0]

export function Quiz() {
  const [points, setPoints] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps)
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(
    null,
  )

  const { navigate } = useNavigation()

  const route = useRoute()
  const { id } = route.params as Params

  const shareShake = useSharedValue(0)

  const animatedShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            shareShake.value,
            [0, 0.5, 1, 1.5, 2, 2.5, 3], // possible values
            [0, -15, 0, 15, 0, -15, 0], // possible styles bases on values
          ),
        },
      ],
    }
  })

  function animateShake() {
    shareShake.value = withSequence(
      // sets value as interval from 0 (initial value) to 3 to 0
      withTiming(3, { duration: 400, easing: Easing.bounce }),
      withTiming(0),
    )
  }

  function handleSkipConfirm() {
    Alert.alert('Pular', 'Deseja realmente pular a questão?', [
      { text: 'Sim', onPress: () => handleNextQuestion() },
      { text: 'Não', onPress: () => null },
    ])
  }

  async function handleFinished() {
    await historyAdd({
      id: new Date().getTime().toString(),
      title: quiz.title,
      level: quiz.level,
      points,
      questions: quiz.questions.length,
    })

    navigate('finish', {
      points: String(points),
      total: String(quiz.questions.length),
    })
  }

  function handleNextQuestion() {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prevState) => prevState + 1)
    } else {
      handleFinished()
    }
  }

  async function handleConfirm() {
    if (alternativeSelected === null) {
      return handleSkipConfirm()
    }

    if (quiz.questions[currentQuestion].correct === alternativeSelected) {
      setPoints((prevState) => prevState + 1)
    } else {
      animateShake()
    }

    setAlternativeSelected(null)
  }

  function handleStop() {
    Alert.alert('Parar', 'Deseja parar agora?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => navigate('home'),
      },
    ])

    return true
  }

  useEffect(() => {
    const quizSelected = QUIZ.filter((item) => item.id === id)[0]
    setQuiz(quizSelected)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (quiz.questions) {
      handleNextQuestion()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points])

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.question}
      >
        <QuizHeader
          title={quiz.title}
          currentQuestion={currentQuestion + 1}
          totalOfQuestions={quiz.questions.length}
        />

        <Animated.View style={animatedShakeStyle}>
          <Question
            key={quiz.questions[currentQuestion].title}
            question={quiz.questions[currentQuestion]}
            alternativeSelected={alternativeSelected}
            setAlternativeSelected={setAlternativeSelected}
          />
        </Animated.View>

        <View style={styles.footer}>
          <OutlineButton title="Parar" onPress={handleStop} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </ScrollView>
    </View>
  )
}
