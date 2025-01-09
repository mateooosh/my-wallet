import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string,
      secondary: string,
      tertiary: string
    },
    theme: {
      primary: string
      background: string
    }
  }
}