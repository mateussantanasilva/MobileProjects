import { render, screen } from '@testing-library/react-native'
import { Day } from '.'

import ClearDay from '@assets/clear_day.svg'

describe('Component: Day', () => {
  it('should be render day component', () => {
    render(
      <Day
        data={{
          day: '18/07',
          icon: ClearDay,
          max: '34ºc',
          min: '30ºc',
          weather: 'Céu limpo',
        }}
      />,
    )

    expect(screen.getByText('18/07')).toBeTruthy()
  })
})
