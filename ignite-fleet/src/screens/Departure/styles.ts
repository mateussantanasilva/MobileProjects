import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const Content = styled.View`
  flex: 1;
  gap: 16px;

  margin-top: 16px;
  padding-inline: 32px;
`

export const PermissionMessage = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`
