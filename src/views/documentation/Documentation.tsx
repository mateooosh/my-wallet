import { useTheme } from 'styled-components'
import { dark, light } from '../../styles/Theme.ts'
import { Body1, Body2, Caption1, Caption2, Flex, Grid, H1, H2, H3, H4 } from '../../components/styled'
import * as _ from 'lodash'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import CategoryModel from '../../models/CategoryModel.ts'
import { IconRenderer, NavBar } from '../../components'

function Documentation() {
  const theme = useTheme()
  const categories = useSelector(({ settings }) => settings.categories)

  return (
    <div>
      <NavBar label="Documentation"/>
      <Flex $direction="column" $gap="16px" style={{ padding: 20 }}>
        <Flex $align="flex-end" $gap="12px" $wrap="wrap">
          <H1>H1</H1>
          <H2>H2</H2>
          <H3>H3</H3>
          <H4>H4</H4>
          <Body1>Body1</Body1>
          <Body2>Body2</Body2>
          <Caption1>Caption1</Caption1>
          <Caption2>Caption2</Caption2>
        </Flex>

        <Grid $columns="50% 1fr 1fr" $gap="2px 8px">
          <Body1>Font</Body1>
          <Body1>Light</Body1>
          <Body1>Dark</Body1>
          {_.map(_.keys(theme.font), (property: string) =>
            <Fragment key={property}>
              <div>{property}</div>
              <div style={{ color: light.font[property] }}>Text</div>
              <div style={{ color: dark.font[property] }}>Text</div>
            </Fragment>
          )}
        </Grid>

        <Grid $columns="50% 1fr 1fr" $gap="2px 8px">
          <Body1>Theme</Body1>
          <Body1>Light</Body1>
          <Body1>Dark</Body1>
          {_.map(_.keys(theme.theme), (property: string) =>
            <Fragment key={property}>
              <div>{property}</div>
              <div style={{ backgroundColor: light.theme[property] }}></div>
              <div style={{ backgroundColor: dark.theme[property] }}></div>
            </Fragment>
          )}
        </Grid>

        <Grid $columns="30px 1fr 40px 40px" $gap="2px 8px">
          <Body1>ID</Body1>
          <Body1>Category</Body1>
          <Body1>Icon</Body1>
          <Body1>Color</Body1>
          {_.map(categories, (category: CategoryModel) =>
            <Fragment key={category.id}>
              <div>{category.id}</div>
              <div>{category.name}</div>
              <IconRenderer icon={category.icon} color={category.color}/>
              <div style={{ backgroundColor: category.color }}></div>
            </Fragment>
          )}
        </Grid>
      </Flex>
    </div>
  )
}

export default Documentation
