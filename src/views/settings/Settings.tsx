import { useTheme } from 'styled-components'
import { Flex } from '../../components/styled'
import { Card, NavBar } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { InputNumber, Select, Switch } from 'antd'
import React, { useMemo } from 'react'
import * as _ from 'lodash'
import { CURRENCIES } from '../../utils/utils.ts'

function Settings() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const limit = useSelector(({ settings }) => settings.limit)
  const darkMode = useSelector(({ settings }) => settings.darkMode)
  const currency = useSelector(({ settings }) => settings.currency)

  const toggleTheme = (): void => {
    dispatch({ type: 'settings/toggleDarkMode' })
  }

  const goToCategories = (): void => {
    navigate('/my-wallet/settings/categories')
  }

  const goToDocumentation = (): void => {
    navigate('/my-wallet/settings/documentation')
  }

  const clearStorage = (): void => {
    // dispatch({ type: 'transactions/clearState' })
    // dispatch({ type: 'settings/clearState' })
  }

  const onLimitChange = (value): void => {
    dispatch({ type: 'settings/setLimit', payload: value })
  }

  const onCurrencyChange = (value): void => {
    dispatch({ type: 'settings/setCurrency', payload: value })
  }

  const currenciesDataSource = useMemo(() => {
    return _.map(CURRENCIES, (currency: string) => {
      return {
        value: currency,
        label: currency
      }
    })
  }, [CURRENCIES])

  return (
    <div>
      <NavBar label="Settings"/>
      <Flex $direction="column" $gap="8px" style={{ padding: 20 }}>
        <div>
          <Card icon="FaMoon" iconColor="#4A90E2"
                right={<Switch value={darkMode} onChange={toggleTheme}/>}>
            Dark mode
          </Card>
          <Card onClick={goToCategories} icon="FaShapes" iconColor="#2ECC71">Categories</Card>
          <Card icon="FaGaugeHigh" iconColor="#E67E22"
                right={<InputNumber value={limit} onChange={onLimitChange}
                                    size="large" min={0} max={1000000} type="number"
                                    controls={false} style={{ width: 80 }}/>}>
            Limit
          </Card>
          <Card onClick={goToDocumentation} icon="FaBook" iconColor="#9B59B6">Documentation</Card>
          <Card icon="FaDollarSign" iconColor="#F1C40F"
                right={<Select size="large"
                               value={currency}
                               onChange={onCurrencyChange}
                               options={currenciesDataSource}/>}>
            Currency
          </Card>
          <Card onClick={clearStorage} icon="FaTrashCan" iconColor="#E74C3C">Clear data</Card>
          <Card icon="FaEarthAmericas" iconColor="#3498DB">Language</Card>
        </div>
      </Flex>
    </div>
  )
}

export default Settings
