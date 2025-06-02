import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    font: { // można zmienić na typography
      primary: string
      secondary: string
      tertiary: string
    },
    theme: {
      primary: string
      background: string
      danger: string
      warning: string
      divider: string
      dangerSelected: string
      primarySelected: string
    }
  }
}