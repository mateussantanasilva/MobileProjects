import styled, { css } from 'styled-components/native'

export type SizeProps = 'SM' | 'MD'

interface ContainerProps {
  size: SizeProps
}

const variantSizeStyles = (size: SizeProps) => {
  return {
    SM: css`
      width: 32px;
      height: 32px;
    `,

    MD: css`
      width: 46px;
      height: 46px;
    `,
  }[size] // return selected size
}

export const Container = styled.View<ContainerProps>`
  justify-content: center;
  align-items: center;
  margin-right: 12px;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  ${({ size }) => variantSizeStyles(size)}
`
