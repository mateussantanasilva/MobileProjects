import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
  align-items: center;
  justify-content: center;

  height: 56px;
  width: 56px;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`
