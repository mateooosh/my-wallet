import styled from 'styled-components'

interface ChartLimitProps {
  $limitHeight?: number,
  theme: any
}

export const ChartLimit = styled.div<ChartLimitProps>`
  position: absolute;
  bottom: ${({ $limitHeight }) => ($limitHeight) + '%'};
  left: -8px;
  //right: -8px;
  height: 2px;
  width: calc(100% + 16px);
  border-radius: 6px;
  background-color: ${({ theme }) => theme.theme.danger};
  z-index: 0;
  //animation: example 2s;

  //@keyframes example {
  //  from {
  //    width: 0;
  //    //right: -8px;
  //  }
  //  to {
  //    width: calc(100% + 16px);
  //    //right: 8px;
  //  }
  //}
`
