import { TextInput, TextInputProps } from 'react-native'
import { InputContainer } from './styles'
import { useTheme } from 'styled-components/native'
import { forwardRef } from 'react'

export const Input = forwardRef<TextInput, TextInputProps>(function Input({
  ...props
}: TextInputProps) {
  const { COLORS } = useTheme() // using useTheme() for example

  return <InputContainer placeholderTextColor={COLORS.GRAY_300} {...props} />
})
