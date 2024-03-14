import 'styled-components/native'
import { THEME } from 'src/theme'

declare module 'styled-components/native' {
  type ThemeType = typeof THEME

  // eslint-disable-next-line prettier/prettier
  export interface DefaultTheme extends ThemeType {}
}
