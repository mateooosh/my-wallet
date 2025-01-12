import { useTheme } from 'styled-components'
import { dark, light } from '../../styles/Theme.ts'
import { Body1, Body2, Caption1, Caption2, H1, H2, H3, H4 } from '../../components/styled/fonts.ts'
import { Flex } from '../../components/styled/flexbox.ts'
import { Grid } from '../../components/styled/grid.ts'
import * as _ from 'lodash'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CategoryModel from '../../models/CategoryModel.ts'

function IconRenderer({ category }) {
  const [DynamicIcon, setDynamicIcon] = useState(null)

  useEffect(() => {
    async function loadIcon() {
      try {
        const { [category.icon]: Icon } = await import('react-icons/fa6')
        setDynamicIcon(() => Icon)
      } catch (error) {
        console.error(`Error loading icon ${category.icon}:`, error)
      }
    }

    loadIcon()
  }, [category.icon])

  return DynamicIcon ? (
    <Flex
      $justify="center"
      $align="center"
      style={{
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: category.color,
        zIndex: 2
      }}
    >
      <DynamicIcon size="18px" color="white"/>
    </Flex>
  ) : null
}

function Documentation() {
  const theme = useTheme()
  const categories = useSelector(state => state.categories)

  return (
    <Flex $direction="column" $gap="16px">
      <H1>Documentation</H1>
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
            <IconRenderer category={category}/>
            <div style={{ backgroundColor: category.color }}></div>
          </Fragment>
        )}
      </Grid>
    </Flex>
  )
}

export default Documentation
