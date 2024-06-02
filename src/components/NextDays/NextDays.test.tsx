import { render, screen } from '@testing-library/react-native'
import { NextDays } from '.'
import { mockNextDaysInfo } from '@__tests__/mocks/mockNextDaysInfo'

describe('Component: NextDays', () => {
  it('should be render next days component', () => {
    render(<NextDays data={mockNextDaysInfo} />)

    expect(screen.getByText('19/07')).toBeTruthy()
  })
})
