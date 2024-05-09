import { MMKV } from 'react-native-mmkv'

const mmkvStorage = new MMKV()

const ASYNC_STORAGE_KEY = '@ignitefleet:last_sync'

export function saveLastSyncTimestamp() {
  const timestamp = new Date().getTime()

  mmkvStorage.set(ASYNC_STORAGE_KEY, timestamp)

  return timestamp
}

export function getLastSyncTimestamp() {
  const timestamp = mmkvStorage.getNumber(ASYNC_STORAGE_KEY)

  return timestamp
}
