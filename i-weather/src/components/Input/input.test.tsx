import { render, screen } from '@testing-library/react-native'
import { Input } from '.'

describe('Component: Input', () => {
  it('should be render without activity indicator', () => {
    // const { debug } = render(<Input />)
    // debug() // (optional) show the component informations using console.log

    render(<Input />)

    // testId identifies the component that will be used in the test
    // getByTestId returns exception if the id does not exist
    const activityIndicator = screen.queryByTestId('activity-indicator')
    expect(activityIndicator).toBeNull()
  })

  it('should be render with activity indicator', () => {
    render(<Input isLoading />)

    const activityIndicator = screen.getByTestId('activity-indicator')
    expect(activityIndicator).toBeTruthy()
  })
})
