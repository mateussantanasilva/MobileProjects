import { api } from '@services/api'
import {
  loadAuthTokenStorage,
  removeAuthTokenStorage,
  saveAuthTokenStorage,
} from '@storage/authTokenStorage'
import {
  loadUserStorage,
  removeUserStorage,
  saveUserStorage,
} from '@storage/userStorage'
import { CustomError } from '@utils/CustomError'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { UserDTO } from 'src/@types/UserDTO'

interface AuthContextData {
  user: UserDTO
  isLoadingUserData: boolean
  authenticateUser: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (updatedUser: UserDTO) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)

  function updateUserAndToken(user: UserDTO, token: string) {
    // sets the token in requests headers
    api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : ''

    setUser(user)
  }

  async function authenticateUser(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        setIsLoadingUserData(true)

        await saveUserStorage(data.user)
        await saveAuthTokenStorage(data.token)

        updateUserAndToken(data.user, data.token)
      }
    } catch (error) {
      if (error instanceof CustomError || error instanceof Error) throw error

      throw new Error()
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserData(true)

      await removeUserStorage()
      await removeAuthTokenStorage()

      updateUserAndToken({} as UserDTO, '')
    } catch (error) {
      if (error instanceof Error) throw error

      throw new Error()
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function updateUserProfile(updatedUser: UserDTO) {
    try {
      setUser(updatedUser)
      await saveUserStorage(updatedUser)
    } catch (error) {
      if (error instanceof Error) throw error

      throw new Error()
    }
  }

  const loadUserAndTokenData = useCallback(async () => {
    try {
      setIsLoadingUserData(true)

      const loggedUser = await loadUserStorage()
      const token = await loadAuthTokenStorage()

      if (loggedUser && token) updateUserAndToken(loggedUser, token)
    } catch (error) {
      if (error instanceof Error) throw error

      throw new Error()
    } finally {
      setIsLoadingUserData(false)
    }
  }, [])

  useEffect(() => {
    loadUserAndTokenData()
  }, [loadUserAndTokenData])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserData,
        authenticateUser,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
