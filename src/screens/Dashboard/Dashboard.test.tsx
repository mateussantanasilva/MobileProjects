import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@__tests__/customRender'
import { api } from '@services/api'
import { Dashboard } from '.'
import { saveStorageCity } from '@libs/asyncStorage/cityStorage'
import { mockWeatherAPIResponse } from '@__tests__/mocks/mockApiResponseWeather'
import { mockApiResponseCity } from '@__tests__/mocks/mockApiResponseCity'

describe('Screen: Dashboard', () => {
  // code equal in all tests to be executed before
  // beforeAll() is executed only once before the first test
  beforeAll(async () => {
    const mockStoragedCity = {
      id: '10',
      name: 'Minas Gerais',
      latitude: 123,
      longitude: 456,
    }

    await saveStorageCity(mockStoragedCity)
  })

  it('should be show city weather', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse })

    render(<Dashboard />)

    await waitFor(
      () =>
        expect(screen.findByText(/minas/i, {}, { timeout: 3000 })).toBeTruthy,
    )
  })

  it('should be show another selected weather city', async () => {
    jest
      .spyOn(api, 'get')
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse }) // 1ª request result
      .mockResolvedValueOnce({ data: mockApiResponseCity }) // 2ª request result
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse }) // 3ª request result

    render(<Dashboard />)

    // queryByTestId returns null if the id does not exist
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'))

    await waitFor(() =>
      act(() => {
        // getByTestId returns exception if the id does not exist
        const searchInput = screen.getByTestId('search-input')
        fireEvent.changeText(searchInput, 'São Paulo')
      }),
    )

    await waitFor(() =>
      act(() => {
        fireEvent.press(screen.getByText('São Paulo', { exact: false }))
      }),
    )

    expect(screen.getByText('São Paulo', { exact: false })).toBeTruthy()
  })
})
