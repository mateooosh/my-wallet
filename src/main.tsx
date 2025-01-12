import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './views/main/Main'
import Documentation from './views/documentation/Documentation.tsx'
import Transactions from './views/transactions/Transactions.tsx'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { dark, light } from './styles/Theme.ts'
import { Provider, useDispatch, useSelector } from 'react-redux'
import settingsStore from './store/SettingsStore.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>
  },
  {
    path: '/documentation',
    element: <Documentation/>
  },
  {
    path: '/transactions',
    element: <Transactions/>
  }
])

const AppThemeProvider = ({ children }) => {
  const darkMode = useSelector(state => state.darkMode)
  const dispatch = useDispatch()

  const toggleTheme = (): void => {
    dispatch({ type: 'settings/toggleDarkMode' })
  }

  const theme: DefaultTheme = darkMode ? dark : light

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        padding: 20,
        height: '100%',
        backgroundColor: theme.theme.background,
        color: theme.font.primary,
        overflow: 'auto'
      }}>
        <button onClick={toggleTheme}>
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        {children}
      </div>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={settingsStore}>
      <AppThemeProvider>
        <RouterProvider router={router}/>
      </AppThemeProvider>
    </Provider>
  </StrictMode>
)
