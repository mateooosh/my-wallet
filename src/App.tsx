import './App.css'
import { Summary } from './components/Summary.tsx'
import { Body1, H2 } from './components/styled/fonts.ts'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Flex } from './components/styled/flexbox.ts'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { useState } from 'react'
import { dark, light } from './styles/Theme.ts'
import { Chart } from './components/chart/Chart.tsx'



const dataSource = [
  {
    value: 720,
    label: "Jul"
  },
  {
    value: 935,
    label: "Aug"
  },
  {
    value: 550,
    label: "Sep"
  },
  {
    value: 300,
    label: "Oct"
  }
]

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const toggleTheme = (): void => {
    setIsDarkTheme((prevTheme: boolean) => !prevTheme)
  }

  const theme: DefaultTheme = isDarkTheme ? dark : light

  return (
    <ThemeProvider theme={theme}>
      <button onClick={toggleTheme}>
        Switch to {isDarkTheme ? 'Light' : 'Dark'} Mode
      </button>
      <Flex $direction="column" $gap="16px" style={{ padding: 20, height: '100%', backgroundColor: theme.theme.background }}>
        <Summary/>
        <Flex $align="center" $justify="center" $gap="16px">
          <FaAngleLeft color="grey"/>
          <H2 style={{ color: 'grey', textAlign: 'center' }}>March 2024</H2>
          <FaAngleRight color="grey"/>
        </Flex>
        <Chart dataSource={dataSource}/>
      </Flex>
    </ThemeProvider>
  )
}

export default App
