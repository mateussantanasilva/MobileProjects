import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

export type ButtonIconStyle = 'PRIMARY' | 'SECONDARY'

interface ButtonIconProps {
  variant: ButtonIconStyle
}

export const ButtonIconContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  justify-content: center;
  align-items: center;

  margin-left: 12px;

  width: 56px;
  height: 56px;
`

export const ButtonIconSvg = styled(MaterialIcons).attrs<ButtonIconProps>(
  ({ theme, variant }) => ({
    size: 24,
    color:
      variant === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK,
  }),
)``
