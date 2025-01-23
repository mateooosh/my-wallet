import { useTheme } from 'styled-components'
import { Flex } from '../../components/styled'
import { FormItem, NavBar } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, InputNumber } from 'antd'
import React from 'react'

function Settings() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const limit = useSelector(({ settings }) => settings.limit)
  const darkMode = useSelector(({ settings }) => settings.darkMode)

  const toggleTheme = (): void => {
    dispatch({ type: 'settings/toggleDarkMode' })
  }

  const onLimitChange = (value): void => {
    dispatch({ type: 'settings/setLimit', payload: value })
  }

  return (
    <div>
      <NavBar label="Settings"/>
      <Flex $direction="column" $gap="8px" style={{ padding: 20 }}>
        <Button onClick={toggleTheme}>
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </Button>

        <FormItem label="Limit">
          <InputNumber value={limit} onChange={onLimitChange}
                       size="large" min={0} max={1000000} type="number"
                       controls={false} style={{ width: '100%' }}/>
        </FormItem>
      </Flex>
    </div>
  )
}

export default Settings
