import { act, render, screen, waitFor } from '@__tests__/customRender'
import { Routes } from '.'
import { saveStorageCity } from '@libs/asyncStorage/cityStorage'
import { mockCityToStore } from '@__tests__/mocks/mockCityToStore'
import { api } from '@services/api'
import { mockWeatherAPIResponse } from '@__tests__/mocks/mockApiResponseWeather'

describe('Routes', () => {
  it('should be render search screen when not city selected', async () => {
    render(<Routes />)

    // finding until the info is found, otherwise returns timeout
    const title = await waitFor(() => screen.findByText(/^escolha um local/i))

    expect(title).toBeTruthy()
  })

  it('should be render dashboard screen when city selected', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse })

    await saveStorageCity(mockCityToStore)

    await act(() => waitFor(() => render(<Routes />)))

    const title = screen.getByText(mockCityToStore.name)

    expect(title).toBeTruthy()
  })
})
