import { fireEvent, render, screen } from '@testing-library/react-native'
import { SelectList } from '.'
import { mockCityOptionList } from '@__tests__/mocks/mockCityOptionList'

describe('Component: SelectList', () => {
  it('should be return city details selected', () => {
    const onPress = jest.fn()

    render(
      <SelectList
        data={mockCityOptionList} // create data to make tests independent
        onChange={() => {}}
        onPress={onPress}
      />,
    )

    // get element with this content (<Text />)
    // uses regex or getByText('Campo', { exact: false })
    const selectedCity = screen.getByText(/campo/i)
    fireEvent.press(selectedCity)

    expect(onPress).toHaveBeenCalledWith(mockCityOptionList[1])
  })

  it('not should be show options when data props is empty', () => {
    render(<SelectList data={[]} onChange={() => {}} onPress={() => {}} />)

    const options = screen.getByTestId('options-view')

    expect(options.children).toHaveLength(0)
  })
})
