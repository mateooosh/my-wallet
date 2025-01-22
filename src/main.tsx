import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom'
import Main from './views/main/Main'
import Documentation from './views/documentation/Documentation.tsx'
import Transactions from './views/transactions/Transactions.tsx'
import { DefaultTheme, ThemeProvider, useTheme } from 'styled-components'
import { dark, light } from './styles/Theme.ts'
import { Provider, useDispatch, useSelector } from 'react-redux'
import EditTransaction from './views/edit-transaction/EditTransaction.tsx'
import store from './store/store.ts'
import { Button } from 'antd'
import { BottomBar } from './components'

const Layout = () => {
  const darkMode = useSelector(({ settings }) => settings.darkMode)

  const theme = useTheme()
  const dispatch = useDispatch()

  const toggleTheme = (): void => {
    dispatch({ type: 'settings/toggleDarkMode' })
  }

  return (
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
        <Outlet/>
      </div>
      <BottomBar/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/my-wallet')
  },
  {
    path: '/my-wallet',
    element: <Layout/>,
    children: [
      {
        path: '',
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
    ]
  }
])

const AppThemeProvider = ({ children }) => {
  const darkMode = useSelector(({ settings }) => settings.darkMode)

  const theme: DefaultTheme = darkMode ? dark : light

  return (
    <ThemeProvider theme={theme}>
      {children}
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
