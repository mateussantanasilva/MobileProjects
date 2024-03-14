import { EmptyListContainer, EmptyListMessage } from './styles'

interface EmptyListProps {
  message: string
}

export function EmptyList({ message }: EmptyListProps) {
  return (
    <EmptyListContainer>
      <EmptyListMessage>{message}</EmptyListMessage>
    </EmptyListContainer>
  )
}
