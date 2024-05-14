import { MMKV } from 'react-native-mmkv'

interface LocationProps {
  latitude: number
  longitude: number
  timestamp: number
}

const mmkvStorage = new MMKV()

const ASYNC_STORAGE_KEY = '@ignitefleet:last_sync'
const LOCATION_STORAGE_KEY = '@ignitefleet:location'

export function saveLastSyncTimestamp() {
  const timestamp = new Date().getTime()

  mmkvStorage.set(ASYNC_STORAGE_KEY, timestamp)
}

export function getLastSyncTimestamp() {
  const timestamp = mmkvStorage.getNumber(ASYNC_STORAGE_KEY)

  return timestamp
}

export function saveLocationToStorage(newLocation: LocationProps) {
  const storage = getStoredLocations()
  storage.push(newLocation)

  mmkvStorage.set(LOCATION_STORAGE_KEY, JSON.stringify(storage))
}

export function getStoredLocations() {
  const storage = mmkvStorage.getString(LOCATION_STORAGE_KEY)
  const locations: LocationProps[] = storage ? JSON.parse(storage) : []

  return locations
}

export function removeStoredLocations() {
  mmkvStorage.delete(LOCATION_STORAGE_KEY)
}
