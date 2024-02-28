import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#131016',
  },

  title: {
    marginTop: 70,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  description: {
    fontSize: 16,
    color: '#6B6B6B',
  },

  form: {
    marginTop: 36,
    marginBottom: 42,
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },

  input: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#1F1E25',
    height: 56,
    padding: 16,
    fontSize: 16,
    color: '#fff',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31CF67',
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
