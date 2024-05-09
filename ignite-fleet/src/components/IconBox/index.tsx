import { Container, SizeProps } from './styles'
import { useTheme } from 'styled-components/native'
import { SelectedIconProps } from '../../@types/SelectedIcon'

interface IconBoxProps {
  size?: SizeProps
  icon: SelectedIconProps
}

export function IconBox({ size = 'MD', icon: Icon }: IconBoxProps) {
  const { COLORS } = useTheme()

  const iconSize = size === 'MD' ? 24 : 16

  return (
    <Container size={size}>
      <Icon size={iconSize} color={COLORS.BRAND_LIGHT} />
    </Container>
  )
}
