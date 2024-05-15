import { IconBox } from '../IconBox'
import { Container, Description, Information, Label } from './styles'
import { SelectedIconProps } from '../../@types/SelectedIcon'

export interface LocationContentProps {
  label: string
  description: string
}

interface LocationInfoProps extends LocationContentProps {
  icon: SelectedIconProps
}

export function LocationInfo({ icon, label, description }: LocationInfoProps) {
  return (
    <Container>
      <IconBox icon={icon} />

      <Information>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={1}>{description}</Description>
      </Information>
    </Container>
  )
}
