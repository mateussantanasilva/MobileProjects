import { OneSignal } from 'react-native-onesignal'

export function createTagUserInfo() {
  OneSignal.User.addTags({
    user_name: 'Mateus',
    user_email: 'mateus@gmail.com',
  })
}
