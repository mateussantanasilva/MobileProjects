import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export interface FilterStyle {
  isActive?: boolean
}

export const FilterContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
  // eslint-disable-next-line prettier/prettier
}) <FilterStyle>`
  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 1px solid ${theme.COLORS.GREEN_700};
    `}

  align-items: center;
  justify-content: center;

  border-radius: 4px;
  width: 70px;
  height: 38px;
  margin-left: 12px;
`

export const FilterTitle = styled.Text`
  text-transform: uppercase;

  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.WHITE};
  `}
`
