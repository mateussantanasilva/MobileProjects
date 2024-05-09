import { useTheme } from 'styled-components/native'
import { Container, Title } from './styles'
import { IconProps } from 'phosphor-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type IconBoxProps = (props: IconProps) => JSX.Element

interface TopMessageProps {
  title: string
  icon?: IconBoxProps
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
