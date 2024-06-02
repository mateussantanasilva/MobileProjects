import { mockApiResponseCity } from '@__tests__/mocks/mockApiResponseCity'
import { api } from './api'
import { getCityByNameService } from './getCityByNameService'

describe('Service: getCityByNameService', () => {
  it('should return city details', async () => {
    // watches all get requests to return mock value
    jest.spyOn(api, 'get').mockResolvedValue({
      data: mockApiResponseCity, // standard API return data
    })

    const response = await getCityByNameService('São Paulo') // name example

    expect(response.length).toBeGreaterThan(0)
  })
})
