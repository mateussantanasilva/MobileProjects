import { StyleSheet } from 'react-native'

import { THEME } from '../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  history: {
    flexGrow: 1,
    padding: 32,
  },
  swipeableCotainer: {
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    height: 90,
    marginBottom: 12,
    borderRadius: 6,
  },
  swipeableButton: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
