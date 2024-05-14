import {
  Accuracy,
  LocationObject,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import { saveLocationToStorage } from '../libs/mmkv'

interface TaskProps {
  data: {
    locations: LocationObject[]
  }
  error: TaskManager.TaskManagerError | null
}

export const BACKGROUND_TASK_NAME = 'location-tracking'

TaskManager.defineTask(BACKGROUND_TASK_NAME, ({ data, error }: TaskProps) => {
  try {
    if (error) throw error
    if (!data) return

    const { coords, timestamp } = data.locations[0]

    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp,
    }

    saveLocationToStorage(currentLocation)
  } catch (error) {
    console.error(error)
    stopLocationTask()
  }
})

export async function startLocationTask() {
  try {
    const hasStarted =
      await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)

    if (hasStarted) await stopLocationTask()

    // forward the location data to the task (data: LocationObject[])
    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.BestForNavigation,
      distanceInterval: 1,
      timeInterval: 1000,
    })
  } catch (error) {
    console.error(error)
  }
}

export async function stopLocationTask() {
  try {
    const hasStarted =
      await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)

    if (hasStarted) await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
  } catch (error) {
    console.error(error)
  }
}
