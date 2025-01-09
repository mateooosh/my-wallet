import styled from 'styled-components'

interface FlexProps {
  $direction?: string
  $justify?: boolean
  $align?: boolean
  $gap?: string
  $grow?: string
  $alignself?: string
  // children: ReactNode
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props: FlexProps) => props.$direction || 'row'};
  justify-content: ${(props: FlexProps) => props.$justify || 'start'};
  align-items: ${(props: FlexProps) => props.$align || 'normal'};
  gap: ${(props: FlexProps) => props.$gap || '0'};
  flex-grow: ${(props: FlexProps) => props.$grow || '0'};
  align-self: ${(props: FlexProps) => props.$alignself || 'auto'};
`
