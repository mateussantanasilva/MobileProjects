import { IconProps } from 'phosphor-react-native'
import { Container } from './styles'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

type IconBoxProps = (props: IconProps) => JSX.Element

interface IconButton extends TouchableOpacityProps {
  icon: IconBoxProps
}

export function IconButton({ icon: Icon, ...props }: IconButton) {
  const { COLORS } = useTheme()

  return (
    <Container {...props}>
      <Icon size={24} color={COLORS.BRAND_MID} />
    </Container>
  )
}
