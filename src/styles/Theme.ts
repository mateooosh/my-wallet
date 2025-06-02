import { DefaultTheme } from 'styled-components'

export const light: DefaultTheme = {
  font: {
    primary: '#333333',
    secondary: '#4F4F4F',
    tertiary: '#727272'
  },
  theme: {
    primary: '#00785D',
    background: '#FDFDFD',
    danger: '#DB6565',
    warning: '#FDC323',
    divider: '#EEE',
    primarySelected: '#00604a',
    dangerSelected: '#cf3131'
  }
}

export const dark: DefaultTheme = {
  font: {
    primary: '#EAEAEA',
    secondary: '#B3B3B3',
    tertiary: '#737373',
  },
  theme: {
    primary: '#00785D',
    background: '#222222',
    danger: '#DB6565',
    warning: '#FDC323',
    divider: '#282828',
    primarySelected: '#00604a',
    dangerSelected: '#cf3131'
  }
}