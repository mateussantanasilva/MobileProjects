import { mockWeatherAPIResponse } from '@__tests__/mocks/mockApiResponseWeather'
import { api } from './api'
import { getWeatherByCityService } from './getWeatherByCityService'

describe('Service: getWeatherByCityService', () => {
  it('should be return weather api data formatted', async () => {
    // to know the structure of the object that will be returned, use console.log to view the actual return example
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse })

    const response = await getWeatherByCityService({
      latitude: 123,
      longitude: 456,
    })

    expect(response).toHaveProperty('today')
  })
})
