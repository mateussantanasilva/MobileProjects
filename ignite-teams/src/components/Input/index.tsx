import { TextInputProps } from 'react-native'
import { InputContainer } from './styles'
import { useTheme } from 'styled-components/native'

export function Input({ ...props }: TextInputProps) {
  const { COLORS } = useTheme() // using useTheme() for example

  return <InputContainer placeholderTextColor={COLORS.GRAY_300} {...props} />
}
