import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './styles'
import {
  BlurMask,
  Canvas,
  Circle,
  Easing,
  Path,
  Skia,
  runTiming,
  useValue,
} from '@shopify/react-native-skia'
import { THEME } from '../../styles/theme'
import { useEffect } from 'react'

type Props = TouchableOpacityProps & {
  checked: boolean
  title: string
}

const CHECK_SIZE = 28
const CHECK_STROKE = 2
const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2
const CENTER_RADIUS = RADIUS / 2

export function Option({ checked, title, ...rest }: Props) {
  const path = Skia.Path.Make() // svg path
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS)

  const percentage = useValue(0)
  const centerCircle = useValue(0)

  useEffect(() => {
    if (checked) {
      runTiming(percentage, 1, { duration: 400 })
      runTiming(centerCircle, CENTER_RADIUS, { easing: Easing.bounce })
    } else {
      runTiming(percentage, 0, { duration: 400 })
      runTiming(centerCircle, 0, { duration: 300 })
    }
  }, [checked, percentage, centerCircle])

  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checked]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>

      <Canvas style={{ width: CHECK_SIZE * 2, height: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={THEME.COLORS.GREY_500}
          style="stroke"
          strokeWidth={CHECK_STROKE}
        />

        <Path // overlay
          path={path}
          color={THEME.COLORS.BRAND_LIGHT}
          style="stroke"
          strokeWidth={CHECK_STROKE}
          start={0}
          end={percentage}
        >
          <BlurMask blur={1} style="solid" />
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={centerCircle}
          color={THEME.COLORS.BRAND_LIGHT}
        >
          <BlurMask blur={4} style="solid" />
        </Circle>
      </Canvas>
    </TouchableOpacity>
  )
}
