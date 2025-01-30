import { useTheme } from 'styled-components'
import { Flex } from '../../components/styled'
import { Card, FormItem, NavBar } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, InputNumber, Switch } from 'antd'
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

  const goToDocumentation = (): void => {
    navigate('/my-wallet/settings/documentation')
  }

  const clearStorage = (): void => {
    dispatch({ type: 'transactions/clearState' })
    dispatch({ type: 'settings/clearState' })
  }

  const onLimitChange = (value): void => {
    dispatch({ type: 'settings/setLimit', payload: value })
  }

  return (
    <div>
      <NavBar label="Settings"/>
      <Flex $direction="column" $gap="8px" style={{ padding: '20px 30px' }}>
        <Button onClick={goToDocumentation}>Go to documentation</Button>
        <Button onClick={clearStorage}>Clear storage</Button>

        <FormItem label="Limit">
          <InputNumber value={limit} onChange={onLimitChange}
                       size="large" min={0} max={1000000} type="number"
                       controls={false} style={{ width: '100%' }}/>
        </FormItem>

        <div>
          <Card icon="FaMoon" iconColor="#4A90E2"
                right={<Switch value={darkMode} onChange={toggleTheme}/>}>
            Dark mode
          </Card>
          <Card icon="FaShapes" iconColor="#2ECC71">Categories</Card>
          <Card icon="FaGaugeHigh" iconColor="#E67E22">Limit</Card>
          <Card onClick={goToDocumentation} icon="FaBook" iconColor="#9B59B6">Documentation</Card>
          <Card icon="FaDollarSign" iconColor="#F1C40F">Currency</Card>
          <Card icon="FaTrashCan" iconColor="#E74C3C">Clear data</Card>
        </div>
      </Flex>
    </div>
  )
}

export default Settings
