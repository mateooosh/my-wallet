import { useTheme } from 'styled-components'
import { Body1, Flex } from '../styled'
import { FaCirclePlus, FaGear, FaHouse } from 'react-icons/fa6'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function BottomBar() {
  const { theme, font } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const isHomeActive = useMemo(() => pathname === '/my-wallet', [pathname])
  const isAddActive = useMemo(() => pathname === '/my-wallet/transaction', [pathname])
  const isSettingsActive = useMemo(() => pathname === '/my-wallet/settings', [pathname])

  return (
    <Flex style={{ padding: '8px 0', borderTop: '1px solid ' + theme.divider }}>
      <Flex $justify="center" $align="center" $grow="1" $shrink="1" $basis="0">
        <Flex $direction="column" $justify="center" $align="center" onClick={() => navigate('/my-wallet')}>
          <FaHouse size="24px" color={isHomeActive ? theme.primary : font.secondary}/>
          <Body1 style={{ color: isHomeActive ? theme.primary : font.secondary }}>Home</Body1>
        </Flex>
      </Flex>
      <Flex $direction="column" $justify="center" $align="center" $grow="1" $shrink="1" $basis="0">
        <Flex $direction="column" $justify="center" $align="center" onClick={() => navigate('/my-wallet/transaction')}>
          <FaCirclePlus size="24px" color={isAddActive ? theme.primary : font.secondary}/>
          <Body1 style={{ color: isAddActive ? theme.primary : font.secondary }}>Add</Body1>
        </Flex>
      </Flex>
      <Flex $direction="column" $justify="center" $align="center" $grow="1" $shrink="1" $basis="0">
        <Flex $direction="column" $justify="center" $align="center" onClick={() => navigate('/my-wallet/settings')}>
          <FaGear size="24px" color={isSettingsActive ? theme.primary : font.secondary}/>
          <Body1 style={{ color: isSettingsActive ? theme.primary : font.secondary }}>Settings</Body1>
        </Flex>
      </Flex>
    </Flex>
  )
}
