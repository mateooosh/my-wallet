import styled from 'styled-components'

interface GridProps {
  $columns?: number
  $rows?: number
  $justify?: string
  $gap?: string
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns || 'none'};
  // grid-template-rows: ${({ $rows }) => $rows || 'auto'};
  justify-content: ${({ $justify }) => $justify || 'space-between'};
  gap: ${({ $gap }) => $gap || '0'};
  width: 100%;
  //height: auto;
`
