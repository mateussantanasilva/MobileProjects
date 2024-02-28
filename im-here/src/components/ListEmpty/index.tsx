import { Text, View } from 'react-native'
import { styles } from './styles'

export function ListEmpty() {
  return (
    <View style={styles.container}>
      <Text style={styles.alert}>
        A lista está vazia. Adicione participantes a sua lista de presença.
      </Text>
    </View>
  )
}
