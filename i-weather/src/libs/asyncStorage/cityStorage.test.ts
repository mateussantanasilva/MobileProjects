import { mockCityToStore } from '@__tests__/mocks/mockCityToStore'
import {
  getStorageCity,
  removeStorageCity,
  saveStorageCity,
} from './cityStorage'

describe('AsyncStorage: cityStorage', () => {
  it('should be return null when do not have a city storaged', async () => {
    const response = await getStorageCity()

    expect(response).toBeNull()
  })

  it('should be return city storaged', async () => {
    await saveStorageCity(mockCityToStore)

    const response = await getStorageCity()

    expect(response).toEqual(mockCityToStore)
  })

  it('should be remove city storaged', async () => {
    await saveStorageCity(mockCityToStore)
    await removeStorageCity()

    const response = await getStorageCity()

    expect(response).toBeNull()
  })
})
