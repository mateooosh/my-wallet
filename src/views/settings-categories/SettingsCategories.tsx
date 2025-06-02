import { useTheme } from 'styled-components'
import { Flex } from '../../components/styled'
import { Card, IconRenderer, NavBar } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import * as _ from 'lodash'
import CategoryModel from '../../models/CategoryModel.ts'
import { FaPenToSquare } from 'react-icons/fa6'

function SettingsCategories() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const categories = useSelector(({ settings }) => settings.categories)
  const limit = useSelector(({ settings }) => settings.limit)
  const darkMode = useSelector(({ settings }) => settings.darkMode)
  const currency = useSelector(({ settings }) => settings.currency)

  // const toggleTheme = (): void => {
  //   dispatch({ type: 'settings/toggleDarkMode' })
  // }
  //
  // const goToDocumentation = (): void => {
  //   navigate('/my-wallet/settings/documentation')
  // }
  //
  // const clearStorage = (): void => {
  //   dispatch({ type: 'transactions/clearState' })
  //   dispatch({ type: 'settings/clearState' })
  // }
  //
  // const onLimitChange = (value): void => {
  //   dispatch({ type: 'settings/setLimit', payload: value })
  // }
  //
  // const onCurrencyChange = (value): void => {
  //   dispatch({ type: 'settings/setCurrency', payload: value })
  // }

  return (
    <div>
      <NavBar label="Categories"/>
      <Flex $direction="column" $gap="8px" style={{ padding: 20 }}>
        <div>
          {_.map(categories, (category: CategoryModel) =>
            <Card key={category.id} icon={category.icon} iconColor={category.color}
                  right={<FaPenToSquare size="24px" color={theme.font.secondary}/>}>
              {category.name}
            </Card>
          )}
        </div>
      </Flex>
    </div>
  )
}

export default SettingsCategories
