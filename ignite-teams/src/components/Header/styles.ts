import styled from 'styled-components/native'
import { CaretLeft } from 'phosphor-react-native'

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
`

export const HeaderLogo = styled.Image`
  width: 46px;
  height: 55px;
`

export const HeaderBackButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin-right: auto;
  width: 50px;
`

export const HeaderBackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE,
}))``
