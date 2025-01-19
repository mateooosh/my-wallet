import { useTheme } from 'styled-components'
import { Flex, H2 } from '../styled'
import { FaAngleLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

interface Props {
  label: string
}

export function NavBar({ label }: Props) {
  const { theme } = useTheme()
  const navigate = useNavigate()


  const goBack = () => {
    navigate(-1)
  }

  return (
    <Flex $align="center" $gap="16px" style={{ backgroundColor: theme.primary, color: 'white', padding: 16 }}>
        <FaAngleLeft onClick={goBack} size="32px" color="white"/>
        <H2>{label}</H2>
    </Flex>
  )
}
