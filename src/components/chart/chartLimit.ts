import styled from 'styled-components'

interface ChartLimitProps {
  $limitHeight?: number,
  $height?: number,
  $background?: string,
  // theme: any
}

export const ChartLimit = styled.div<ChartLimitProps>`
  position: absolute;
  bottom: ${({ $limitHeight }) => ($limitHeight) + '%'};
  left: -8px;
  height: ${({ $height }) => ($height) + 'px'};
  width: calc(100% + 16px);
  border-radius: 6px;
  background-color: ${({ $background }) => $background};
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
