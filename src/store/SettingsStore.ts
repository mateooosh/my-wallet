import { createSlice } from '@reduxjs/toolkit'
import SettingsModel from '../models/SettingsModel.ts'

const STORAGE_KEY = 'my-wallet|settings'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: SettingsModel.toJSON(SettingsModel.fromJSON(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {})),
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    clearState: () => {
      localStorage.removeItem(STORAGE_KEY)
      return SettingsModel.toJSON(SettingsModel.fromJSON({}))
    }
  }
})

export default settingsSlice.reducer
