import { Car, Key } from 'phosphor-react-native'
import { Container, HighlightedText, IconBox, Message } from './styles'
import { useTheme } from 'styled-components/native'
import { TouchableOpacityProps } from 'react-native'

interface CarStatusProps extends TouchableOpacityProps {
  licensePlate?: string
}

export function CarStatus({ licensePlate, ...props }: CarStatusProps) {
  const { COLORS } = useTheme()

  const Icon = licensePlate ? Car : Key
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : 'Nenhum veículo em uso. '
  const status = licensePlate ? 'chegada.' : 'saída.'

  return (
    <Container {...props}>
      <IconBox>
        <Icon size={52} color={COLORS.BRAND_LIGHT} />
      </IconBox>

      <Message>
        {message}

        <HighlightedText>Clique aqui para registrar a {status}</HighlightedText>
      </Message>
    </Container>
  )
}
