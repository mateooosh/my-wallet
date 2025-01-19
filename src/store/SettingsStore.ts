import { createSlice } from '@reduxjs/toolkit'
import SettingsModel from '../models/SettingsModel.ts'

const STORAGE_KEY = 'settings'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: SettingsModel.toJSON(SettingsModel.fromJSON(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {})),
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }
})

export default settingsSlice.reducer
