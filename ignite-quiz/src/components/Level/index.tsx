import { Pressable, PressableProps } from 'react-native'

import { THEME } from '../../styles/theme'
import { styles } from './styles'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string
  isChecked?: boolean
  type?: keyof typeof TYPE_COLORS
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function Level({
  title,
  type = 'EASY',
  isChecked = false,
  ...rest
}: Props) {
  const COLOR = TYPE_COLORS[type]

  const sharedScale = useSharedValue(1)
  const sharedChecked = useSharedValue(1)

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: sharedScale.value }],
      backgroundColor: interpolateColor(
        sharedChecked.value,
        [0, 1], // possible values
        ['transparent', COLOR], // possible styles based on values
      ),
    }
  })
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        sharedChecked.value,
        [0, 1], // possible values
        [COLOR, THEME.COLORS.GREY_100], // possible styles based on values
      ),
    }
  })

  function onAnimatedPressIn() {
    sharedScale.value = withTiming(1.1)
  }
  function onAnimatedPressOut() {
    sharedScale.value = withTiming(1)
  }

  useEffect(() => {
    sharedChecked.value = withTiming(isChecked ? 1 : 0)
  }, [sharedChecked, isChecked])

  return (
    <AnimatedPressable
      onPressIn={onAnimatedPressIn}
      onPressOut={onAnimatedPressOut}
      style={[styles.container, { borderColor: COLOR }, animatedContainerStyle]}
      {...rest}
    >
      <Animated.Text style={[styles.title, animatedTextStyle]}>
        {title}
      </Animated.Text>
    </AnimatedPressable>
  )
}
