import styled, { css } from 'styled-components/native'

export const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const EmptyListMessage = styled.Text`
  text-align: center;

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
  `}
`
