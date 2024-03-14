import { UsersThree } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

// uses () because {...props}
export const GroupCardContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;

  padding: 24px;
  margin-bottom: 12px;

  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;
`

export const GroupCardIcon = styled(UsersThree).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.GREEN_700,
  weight: 'fill',
}))`
  margin-right: 20px;
`

export const GroudCardTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`
