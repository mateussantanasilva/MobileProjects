import { TouchableOpacityProps } from 'react-native'
import { ButtonIconContainer, ButtonIconStyle, ButtonIconSvg } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

interface ButtonIconProps extends TouchableOpacityProps {
  icon: keyof typeof MaterialIcons.glyphMap
  variant?: ButtonIconStyle
}

export function ButtonIcon({
  icon,
  variant = 'PRIMARY',
  ...props
}: ButtonIconProps) {
  return (
    <ButtonIconContainer {...props}>
      <ButtonIconSvg name={icon} variant={variant} />
    </ButtonIconContainer>
  )
}
