import { combineReducers, configureStore } from '@reduxjs/toolkit'
import settingsStore from './SettingsStore.ts'
import transactionsStore from './TransactionsStore.ts'

const reducer = combineReducers({
  settings: settingsStore,
  transactions: transactionsStore
})

export default configureStore({
  reducer
})
