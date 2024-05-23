import { useCity } from '@hooks/useCity'
import { act, renderHook, waitFor } from '@testing-library/react-native'
import { CityProvider } from './CityContext'
import { mockCityToStore } from '@__tests__/mocks/mockCityToStore'

describe('Context: CityContext', () => {
  it('should be change selected city', async () => {
    const { result } = renderHook(useCity, { wrapper: CityProvider })

    // wait for async requests
    await waitFor(() =>
      // handle async requests
      act(() => {
        result.current.handleChanceCity(mockCityToStore)

        expect(result.current.city?.name).toBe('São Paulo')
      }),
    )
  })
})
