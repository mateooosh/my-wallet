import { ReactNode } from 'react'
import { Body1, Flex } from '../styled'

interface Props {
  label: string
  children: ReactNode
}

export function FormItem({ label, children }: Props) {
  return (
    <Flex $direction="column" $gap="4px">
      <Body1>{label}</Body1>
      {children}
    </Flex>
  )
}
