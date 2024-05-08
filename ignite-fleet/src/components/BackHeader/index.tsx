import { TouchableOpacity } from 'react-native'
import { ArrowIcon, Container, Title } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

interface BackHeaderProps {
  title: string
}

export function BackHeader({ title }: BackHeaderProps) {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 42

  const { goBack } = useNavigation()

  return (
    <Container style={{ paddingTop }}>
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <ArrowIcon />
      </TouchableOpacity>

      <Title>{title}</Title>
    </Container>
  )
}
