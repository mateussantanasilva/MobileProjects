import styled, { css } from 'styled-components/native'

export const PlayersContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
`

export const PlayersForm = styled.View`
  flex-direction: row;
  justify-content: center;

  width: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const PlayersHeaderList = styled.View`
  flex-direction: row;
  align-items: center;

  margin: 32px 0 12px;
  width: 100%;
`

export const PlayersQuantity = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
  `}
`
