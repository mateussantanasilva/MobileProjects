import styled from 'styled-components/native'
import { Power } from 'phosphor-react-native'
import { Image, ImageProps } from 'expo-image'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 32px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const Picture = styled(Image)<ImageProps>`
  width: 54px;
  height: 54px;
  border-radius: 7px;
`

export const Greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`

export const Message = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`

export const Name = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const PowerIcon = styled(Power).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.GRAY_400,
}))``
