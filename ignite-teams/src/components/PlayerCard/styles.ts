import styled, { css } from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

export const PlayerCardContainer = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 56px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;

  margin-bottom: 16px;
`

export const PlayerCardIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.GRAY_200,
}))`
  margin-left: 16px;
  margin-right: 4px;
`

export const PlayerCardName = styled.Text`
  flex: 1;

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_200};
  `}
`
