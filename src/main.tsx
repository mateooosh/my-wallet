import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Main from './views/main/Main'
import Documentation from './views/documentation/Documentation.tsx'
import Transactions from './views/transactions/Transactions.tsx'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { dark, light } from './styles/Theme.ts'
import { Provider, useDispatch, useSelector } from 'react-redux'
import EditTransaction from './views/edit-transaction/EditTransaction.tsx'
import store from './store/store.ts'
import { Button } from 'antd'
import { Body1, Body2, Flex } from './components/styled'
import { FaCirclePlus, FaGear, FaHouse } from 'react-icons/fa6'

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/my-wallet')
  },
  {
    path: '/my-wallet',
    element: <Main/>
  },
  {
    path: '/my-wallet/documentation',
    element: <Documentation/>
  },
  {
    path: '/my-wallet/transactions',
    element: <Transactions/>
  },
  {
    path: '/my-wallet/transaction/:id?',
    element: <EditTransaction/>
  }
])

const AppThemeProvider = ({ children }) => {
  const darkMode = useSelector(({ settings }) => settings.darkMode)
  const dispatch = useDispatch()

  const toggleTheme = (): void => {
    dispatch({ type: 'settings/toggleDarkMode' })
  }

  const theme: DefaultTheme = darkMode ? dark : light

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        backgroundColor: theme.theme.background,
        color: theme.font.primary,
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh'
      }}>
        <Button onClick={toggleTheme}>
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </Button>
        <div style={{ overflow: 'auto', flex: 1 }}>
          {children}
        </div>
        <Flex style={{ padding: '8px 0', borderTop: '1px solid ' + theme.theme.divider }}>
          <Flex $direction="column" $justify="center" $align="center" $grow="1" $shrink="1" $basis="0">
            <FaHouse size="24px" color={theme.font.secondary}/>
            <Body1>Home</Body1>
          </Flex>
          <Flex $direction="column" $justify="center" $align="center"  $grow="1" $shrink="1" $basis="0">
            <FaCirclePlus size="24px" color={theme.font.secondary}/>
            <Body1>Add</Body1>
          </Flex>
          <Flex $direction="column" $justify="center" $align="center"  $grow="1" $shrink="1" $basis="0">
            <FaGear size="24px" color={theme.font.secondary}/>
            <Body1>Settings</Body1>
          </Flex>
        </Flex>
      </div>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <RouterProvider router={router}/>
      </AppThemeProvider>
    </Provider>
  </StrictMode>
)
