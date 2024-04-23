import { BlurMask, Canvas, Rect } from '@shopify/react-native-skia'
import { useWindowDimensions } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { THEME } from '../../styles/theme'
import { useEffect } from 'react'

interface OverlayFeedbackProps {
  status: number
}

const STATUS = [
  'transparent',
  THEME.COLORS.BRAND_LIGHT,
  THEME.COLORS.DANGER_LIGHT,
]

export function OverlayFeedback({ status }: OverlayFeedbackProps) {
  const { width, height } = useWindowDimensions()

  const sharedOpacity = useSharedValue(0)

  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: sharedOpacity.value,
    }
  })

  const color = STATUS[status]

  useEffect(() => {
    sharedOpacity.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.bounce }),
      withTiming(0),
    )
  }, [sharedOpacity, status])

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          height: '100%',
        },
        animatedOverlayStyle,
      ]}
    >
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height + 40} color={color}>
          <BlurMask blur={50} style="inner" />
        </Rect>
      </Canvas>
    </Animated.View>
  )
}
