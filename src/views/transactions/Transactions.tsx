import { useTheme } from 'styled-components'
import { H1 } from '../../components/styled/fonts.ts'
import { Flex } from '../../components/styled/flexbox.ts'
import { TransactionItem } from '../../components/transaction-item/TransactionItem.tsx'
import TransactionModel from '../../models/TransactionModel.ts'

const transactions = [
  new TransactionModel('FaCartShopping', 'Grocery', '14 January 2025', -256, '#FDC323'),
  new TransactionModel('FaBurger', 'McDonald\'s', '14 January 2025', -156, '#00E396'),
  new TransactionModel('FaCar', 'Car', '13 January 2025', -100, '#58BDFF'),
  new TransactionModel('FaWallet', 'Salary', '13 January 2025', 5660, '#FF4560'),
  new TransactionModel('FaCartShopping', 'Grocery', '13 January 2025', -122, '#FDC323')
]

function Transactions() {
  const theme = useTheme()

  return (
    <Flex $direction="column" $gap="16px">
      <H1>Transactions</H1>
      <Flex $direction="column" $gap="1px" style={{ backgroundColor: theme.theme.divider }}>
        {transactions.map(({ icon, categoryName, date, amount, backgroundColor }, index) =>
          <TransactionItem key={index} icon={icon} categoryName={categoryName} date={date} amount={amount}
                           backgroundColor={backgroundColor}/>
        )}
      </Flex>
    </Flex>
  )
}

export default Transactions
