import { TextInput, TextInputProps } from 'react-native'
import { Container, Input, Label } from './styles'
import { forwardRef } from 'react'

interface LicensePlateInputProps extends TextInputProps {
  label: string
}

export const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>

        <Input ref={ref} {...props} />
      </Container>
    )
  },
)
