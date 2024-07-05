// redux toolkit imports
import { useSelector } from 'react-redux'

export const useAuthenticated = () => useSelector(({ main }) => main.user)
