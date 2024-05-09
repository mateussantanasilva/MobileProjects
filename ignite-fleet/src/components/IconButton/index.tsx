import { Container } from './styles'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import { SelectedIconProps } from '../../@types/SelectedIcon'

interface IconButton extends TouchableOpacityProps {
  icon: SelectedIconProps
}

export function IconButton({ icon: Icon, ...props }: IconButton) {
  const { COLORS } = useTheme()

  return (
    <Container {...props}>
      <Icon size={24} color={COLORS.BRAND_MID} />
    </Container>
  )
}
