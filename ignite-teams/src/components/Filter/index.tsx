import { TouchableOpacityProps } from 'react-native'
import { FilterContainer, FilterStyle, FilterTitle } from './styles'

type FilterProps = TouchableOpacityProps &
  FilterStyle & {
    title: string
  }

export function Filter({ title, ...props }: FilterProps) {
  return (
    <FilterContainer {...props}>
      <FilterTitle>{title}</FilterTitle>
    </FilterContainer>
  )
}
