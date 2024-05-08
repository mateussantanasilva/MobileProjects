import { ArrowLeft } from 'phosphor-react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 0 32px 24px;
  z-index: 1;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const ArrowIcon = styled(ArrowLeft).attrs(({ theme }) => ({
  size: 24,
  weight: 'bold',
  color: theme.COLORS.BRAND_LIGHT,
}))``

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`
