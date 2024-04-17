import { Text } from 'react-native'
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { ProgressBar } from '../ProgressBar'
import { QUIZ } from '../../data/quiz'
import { THEME } from '../../styles/theme'
import { styles } from './styles'

type QuizProps = (typeof QUIZ)[0]

interface FixedQuizHeaderProps {
  quiz: QuizProps
  currentQuestion: number
  shareScrollY: SharedValue<number>
}

export function FixedQuizHeader({
  quiz,
  currentQuestion,
  shareScrollY,
}: FixedQuizHeaderProps) {
  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      paddingTop: 50,
      zIndex: 10,
      backgroundColor: THEME.COLORS.GREY_600,
      width: '110%',
      left: '-5%',
      opacity: interpolate(
        shareScrollY.value,
        [50, 90],
        [0, 1],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            shareScrollY.value,
            [50, 100],
            [-40, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }
  })

  return (
    <Animated.View style={animatedProgressStyle}>
      <Text style={styles.title}>{quiz.title}</Text>

      <ProgressBar total={quiz.questions.length} current={currentQuestion} />
    </Animated.View>
  )
}
