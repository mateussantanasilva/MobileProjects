import { TouchableOpacityProps } from 'react-native'
import { Container, Departure, Information, LicensePlate } from './styles'
import { Check, ClockClockwise } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'
import { VehicleDTO } from '../../@types/VehicleDTO'

interface HistoricCardProps extends TouchableOpacityProps {
  data: VehicleDTO
}

export function HistoricCard({ data, ...props }: HistoricCardProps) {
  const { COLORS } = useTheme()

  return (
    <Container {...props}>
      <Information>
        <LicensePlate>{data.licensePlate}</LicensePlate>

        <Departure>{data.createdAt}</Departure>
      </Information>

      {data.isSync ? (
        <Check size={24} color={COLORS.BRAND_LIGHT} />
      ) : (
        <ClockClockwise size={24} color={COLORS.GRAY_400} />
      )}
    </Container>
  )
}
