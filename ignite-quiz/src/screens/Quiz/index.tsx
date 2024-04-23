import { useCallback, useEffect, useState } from 'react'
import { Alert, BackHandler, View } from 'react-native'
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
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { FixedQuizHeader } from '../../components/FixedQuizHeader'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { OverlayFeedback } from '../../components/OverlayFeedback'
import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'

interface Params {
  id: string
}

type QuizProps = (typeof QUIZ)[0]

const CARD_INCLINATION = 10
const CARD_SKIP_AREA = -190

export function Quiz() {
  const [points, setPoints] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps)
  const [statusReply, setStatusReply] = useState(0)
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(
    null,
  )

  const { navigate } = useNavigation()

  const route = useRoute()
  const { id } = route.params as Params

  const sharedShake = useSharedValue(0)
  const sharedScrollY = useSharedValue(0)
  const sharedCardPosition = useSharedValue(0)

  const animatedShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            sharedShake.value,
            [0, 0.5, 1, 1.5, 2, 2.5, 3], // possible values
            [0, -15, 0, 15, 0, -15, 0], // possible styles bases on values
          ),
        },
      ],
    }
  })

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sharedScrollY.value,
        [60, 90],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    }
  })

  const animatedCardStyle = useAnimatedStyle(() => {
    const rotate = sharedCardPosition.value / CARD_INCLINATION

    return {
      transform: [
        { translateX: sharedCardPosition.value },
        { rotate: `${rotate}deg` },
      ],
    }
  })

  const animatedScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      sharedScrollY.value = event.contentOffset.y
    },
  })

  const onPan = Gesture.Pan()
    .activateAfterLongPress(200) // avoid conflicts with ScrollView
    .onUpdate((event) => {
      const moveToLeft = event.translationX < 0

      if (moveToLeft) sharedCardPosition.value = event.translationX
    })
    .onEnd((event) => {
      if (event.translationX <= CARD_SKIP_AREA) runOnJS(handleSkipConfirm)() // executes in the same thread

      sharedCardPosition.value = withTiming(0) // sets linearly to 0
    })

  async function animateShake() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)

    sharedShake.value = withSequence(
      // sets value as interval from 0 (initial value) to 3 to 0 - show and hide
      withTiming(3, { duration: 400, easing: Easing.bounce }),
      withTiming(0, undefined, (finished) => {
        'worklet' // enable js code block
        finished && runOnJS(handleNextQuestion)()
      }),
    )
  }

  async function playSound(isCorrect: boolean) {
    const file = isCorrect
      ? require('../../assets/correct.mp3')
      : require('../../assets/wrong.mp3')

    const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true }) // auto start

    await sound.setPositionAsync(0) // set to start at the beginning
    await sound.playAsync()
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

      await playSound(true)
      setStatusReply(1)
    } else {
      await playSound(false)
      setStatusReply(2)
      animateShake()
    }

    setAlternativeSelected(null)
  }

  const handleStop = useCallback(() => {
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
  }, [navigate])

  useEffect(() => {
    const quizSelected = QUIZ.filter((item) => item.id === id)[0]
    setQuiz(quizSelected)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // works on Android - physical button and gesture
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleStop,
    )

    return () => backHandler.remove()
  }, [handleStop])

  useEffect(() => {
    if (quiz.questions) {
      handleNextQuestion()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points])

  if (isLoading) return <Loading />

  return (
    <View style={styles.container}>
      <OverlayFeedback status={statusReply} />

      <FixedQuizHeader
        quiz={quiz}
        currentQuestion={currentQuestion + 1}
        shareScrollY={sharedScrollY}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.question}
        onScroll={animatedScrollHandler}
      >
        <Animated.View style={[styles.header, animatedHeaderStyle]}>
          <QuizHeader
            title={quiz.title}
            currentQuestion={currentQuestion + 1}
            totalOfQuestions={quiz.questions.length}
          />
        </Animated.View>

        <GestureDetector gesture={onPan}>
          <Animated.View style={[animatedShakeStyle, animatedCardStyle]}>
            <Question
              key={quiz.questions[currentQuestion].title}
              question={quiz.questions[currentQuestion]}
              alternativeSelected={alternativeSelected}
              setAlternativeSelected={setAlternativeSelected}
              onUnmount={() => setStatusReply(0)}
            />
          </Animated.View>
        </GestureDetector>

        <View style={styles.footer}>
          <OutlineButton title="Parar" onPress={handleStop} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </Animated.ScrollView>
    </View>
  )
}
