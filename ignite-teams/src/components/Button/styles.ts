import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export type ButtonStyle = 'PRIMARY' | 'SECONDARY'

interface ButtonProps {
  variant: ButtonStyle
}

export const ButtonContainer = styled(TouchableOpacity).attrs<ButtonProps>({
  activeOpacity: 0.7,
})`
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 56px;
  max-height: 56px;
  border-radius: 6px;
  background-color: ${({ theme, variant }) =>
    variant === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
`

export const ButtonTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`
