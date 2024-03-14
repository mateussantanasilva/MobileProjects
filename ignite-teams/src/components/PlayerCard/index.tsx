import { ButtonIcon } from '@components/ButtonIcon'
import { PlayerCardContainer, PlayerCardIcon, PlayerCardName } from './styles'

interface PlayerCardProps {
  name: string
  onRemove: () => void
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <PlayerCardContainer>
      <PlayerCardIcon name="person" />

      <PlayerCardName>{name}</PlayerCardName>

      <ButtonIcon icon="close" variant="SECONDARY" onPress={onRemove} />
    </PlayerCardContainer>
  )
}
