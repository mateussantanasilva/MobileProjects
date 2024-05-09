import { useTheme } from 'styled-components/native'
import { Container, Title } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SelectedIconProps } from '../../@types/SelectedIcon'

interface TopMessageProps {
  title: string
  icon?: SelectedIconProps
}

export function TopMessage({ title, icon: Icon }: TopMessageProps) {
  const { COLORS } = useTheme()

  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 5

  return (
    <Container style={{ paddingTop }}>
      {Icon && <Icon size={18} color={COLORS.GRAY_100} />}

      <Title>{title}</Title>
    </Container>
  )
}
