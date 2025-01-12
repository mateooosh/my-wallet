import styled from 'styled-components'

interface FlexProps {
  $direction?: string
  $justify?: boolean
  $align?: boolean
  $gap?: string
  $grow?: string
  $alignself?: string
  $wrap?: string
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ $direction }: FlexProps) => $direction || 'row'};
  justify-content: ${({ $justify }) => $justify || 'start'};
  align-items: ${({ $align }) => $align || 'normal'};
  gap: ${({ $gap }) => $gap || '0'};
  flex-grow: ${({ $grow }) => $grow || '0'};
  align-self: ${({ $alignself }) => $alignself || 'auto'};
  flex-wrap: ${({ $wrap }) => $wrap || 'nowrap'};
`
