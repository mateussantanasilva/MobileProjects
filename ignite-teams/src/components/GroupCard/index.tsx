import { GroudCardTitle, GroupCardContainer, GroupCardIcon } from './styles'
import { TouchableOpacityProps } from 'react-native'

interface GroupCardProps extends TouchableOpacityProps {
  title: string
}

export function GroupCard({ title, ...props }: GroupCardProps) {
  return (
    <GroupCardContainer {...props}>
      <GroupCardIcon />
      <GroudCardTitle>{title}</GroudCardTitle>
    </GroupCardContainer>
  )
}
