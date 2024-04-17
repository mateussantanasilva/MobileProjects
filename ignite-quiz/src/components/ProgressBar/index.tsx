import { View } from 'react-native'

import { styles } from './styles'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'

interface Props {
  total: number
  current: number
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 100)

  const sharedPercentage = useSharedValue(percentage)

  const animatedProgressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${sharedPercentage.value}%`,
    }
  })

  useEffect(() => {
    sharedPercentage.value = withTiming(percentage)
  }, [sharedPercentage, percentage])

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, animatedProgressBarStyle]} />
    </View>
  )
}
