import { TextInput, TextInputProps } from 'react-native'
import { Container, Input, Label } from './styles'
import { forwardRef } from 'react'

interface TextAreaInputProps extends TextInputProps {
  label: string
}

export const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>

        <Input ref={ref} {...props} />
      </Container>
    )
  },
)
