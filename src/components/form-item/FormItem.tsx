import { ReactNode } from 'react'
import { Flex } from '../styled/flexbox.ts'
import { Body1 } from '../styled/fonts.ts'

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
