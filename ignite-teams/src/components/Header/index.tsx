import { useNavigation } from '@react-navigation/native'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderBackIcon,
  HeaderLogo,
} from './styles'

import LogoImage from '@assets/logo.png'

interface HeaderProps {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  const { navigate } = useNavigation()

  function handleNavigateToHome() {
    navigate('groups')
  }

  return (
    <HeaderContainer>
      {showBackButton && (
        <HeaderBackButton onPress={handleNavigateToHome}>
          <HeaderBackIcon />
        </HeaderBackButton>
      )}

      <HeaderLogo source={LogoImage} alt="Logo de um foguete" />
    </HeaderContainer>
  )
}
