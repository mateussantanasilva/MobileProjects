import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1F1E25',
    borderRadius: 5,
    paddingStart: 16,
    marginBottom: 10,
  },

  name: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e23c44',
    width: 56,
    height: 56,
    borderRadius: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
})
