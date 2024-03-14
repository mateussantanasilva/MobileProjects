import { TouchableOpacityProps } from 'react-native'
import { ButtonContainer, ButtonStyle, ButtonTitle } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonStyle
}

export function Button({ title, variant = 'PRIMARY', ...props }: ButtonProps) {
  return (
    <ButtonContainer variant={variant} {...props}>
      <ButtonTitle>{title}</ButtonTitle>
    </ButtonContainer>
  )
}
