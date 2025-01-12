import { configureStore, createSlice } from '@reduxjs/toolkit'
import SettingsModel from '../models/SettingsModel.ts'

const STORAGE_KEY = 'settings'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: SettingsModel.fromJSON(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}),
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }
})

// export const { toggleDarkMode } = settingsSlice.actions

export default configureStore(settingsSlice)
