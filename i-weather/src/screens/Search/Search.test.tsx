import { fireEvent, render, screen, waitFor } from '@__tests__/customRender'
import { Search } from '.'
import { api } from '@services/api'
import { mockApiResponseCity } from '@__tests__/mocks/mockApiResponseCity'

describe('Screen: Search', () => {
  it('should be show city option', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockApiResponseCity })

    render(<Search />)

    const searchInput = screen.getByTestId('search-input')
    fireEvent.changeText(searchInput, 'São Paulo')

    const option = await waitFor(() => screen.findByText(/são paulo/i))
    expect(option).toBeTruthy()
  })
})
