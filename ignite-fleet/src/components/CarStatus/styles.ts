import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;

  margin-block: 32px;
  padding: 22px;
  width: 100%;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const IconBox = styled.View`
  justify-content: center;
  align-items: center;

  width: 77px;
  height: 77px;
  margin-right: 12px;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const Message = styled.Text`
  flex: 1;
  text-align: justify;
  /* textAlignVertical: center; */

  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`

export const HighlightedText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`
