import { Summary } from '../../components/summary/Summary.tsx'
import { Body2, H1 } from '../../components/styled/fonts.ts'
import { Flex } from '../../components/styled/flexbox.ts'
import { useTheme } from 'styled-components'
import { Chart } from '../../components/chart/Chart.tsx'
import { CategoryItem } from '../../components/category-item/CategoryItem.tsx'
import { TransactionItem } from '../../components/transaction-item/TransactionItem.tsx'
import Documentation from '../documentation/Documentation.tsx'
import { useNavigate } from 'react-router-dom'

const dataSource = [
  {
    value: 720,
    label: "Jul"
  },
  {
    value: 935,
    label: "Aug"
  },
  {
    value: 550,
    label: "Sep"
  },
  {
    value: 300,
    label: "Oct"
  }
]

function Main() {
  const theme = useTheme()
  const navigate = useNavigate()

  const goToDocumentation = (): void => {
    navigate('/documentation')
  }

  return (
    <Flex $direction="column" $gap="16px">
      <button onClick={goToDocumentation}>Go to documentation</button>
      <Summary/>
      {/*<Flex $align="center" $justify="center" $gap="16px">*/}
      {/*  <FaAngleLeft color="grey"/>*/}
      {/*  <H2 style={{ color: 'grey', textAlign: 'center' }}>March 2024</H2>*/}
      {/*  <FaAngleRight color="grey"/>*/}
      {/*</Flex>*/}
      <H1>Spending breakdown</H1>
      <Chart dataSource={dataSource}/>

      <H1>Spending details</H1>
      <Flex $direction="column" $gap="4px">
        <CategoryItem icon="FaCartShopping" categoryName="Shopping" amount="256 PLN" percentage="32" backgroundColor="#FDC323"/>
        <CategoryItem icon="FaBurger" categoryName="Food" amount="156 PLN" percentage="23.8" backgroundColor="#00E396"/>
        <CategoryItem icon="FaCar" categoryName="Car" amount="100 PLN" percentage="17" backgroundColor="#58BDFF"/>
      </Flex>

      <Flex $align="flex-end">
        <Flex $grow="1">
          <H1>Last transactions</H1>
        </Flex>
        <Body2 onClick={() => navigate('/transactions')}>See all</Body2>
      </Flex>
      <Flex $direction="column" $gap="1px" style={{ backgroundColor: theme.theme.divider }}>
        <TransactionItem icon="FaCartShopping" categoryName="Grocery" date="14 January 2025" amount="-256" backgroundColor="#FDC323"/>
        <TransactionItem icon="FaBurger" categoryName="McDonald's" date="14 January 2025" amount="-156" backgroundColor="#00E396"/>
        <TransactionItem icon="FaCar" categoryName="Car" date="13 January 2025" amount="-100" backgroundColor="#58BDFF"/>
        <TransactionItem icon="FaWallet" categoryName="Salary" date="13 January 2025" amount="5660" backgroundColor="#FF4560"/>
      </Flex>

      <Documentation/>
    </Flex>
  )
}

export default Main
