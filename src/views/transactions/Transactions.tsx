import { useTheme } from 'styled-components'
import { Body1, H1, H3 } from '../../components/styled/fonts.ts'
import { Flex } from '../../components/styled/flexbox.ts'
import { TransactionItem } from '../../components/transaction-item/TransactionItem.tsx'
import { transactions } from '../../mocks/mocks.ts'
import TransactionModel from '../../models/TransactionModel.ts'
import { Grid } from '../../components/styled/grid.ts'

function Transactions() {
  const theme = useTheme()

  return (
    <Flex $direction="column" $gap="16px">
      <H1>Transactions</H1>
      {/*<div>Type (segmented controls)</div>*/}
      {/*<Grid $columns="1fr 1fr" $gap="8px">*/}
      {/*  <div>From</div>*/}
      {/*  <div>To</div>*/}
      {/*  <div>Amount from</div>*/}
      {/*  <div>Amount to</div>*/}
      {/*</Grid>*/}
      <Flex $direction="column" $gap="1px" style={{ backgroundColor: theme.theme.divider }}>
        {/*<H3 style={{ padding: '4px 8px' }}>14 January 2024</H3>*/}
        {transactions.map(({ categoryName, date, amount }: TransactionModel, key: number) =>
          <TransactionItem key={key} categoryName={categoryName} date={date} amount={amount}/>
        )}
      </Flex>
    </Flex>
  )
}

export default Transactions
