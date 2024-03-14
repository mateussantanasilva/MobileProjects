import { TextInput } from 'react-native'
import styled, { css } from 'styled-components/native'

export const InputContainer = styled(TextInput)`
  flex: 1;

  height: 56px;
  max-height: 56px;
  padding: 16px;
  border-radius: 6px;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_700};

    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
  `}
`
