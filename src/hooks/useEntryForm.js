// react imports
import { useState } from 'react'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { createUser, getUser } from '@store/users'

const useEntryForm = () => {
  // form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  // sign up function
  const dispatch = useDispatch()
  const handleSignUp = () => {
    setErrors({})
    try {
      const { payload } = dispatch(createUser({ name, email, password }))
      return payload
    }
    catch (error) {
      setErrors(error)
    }
  }

  // sign in function
  const login = useSelector(({ users }) => getUser(users))
  const handleSignIn = () => {
    setErrors({})
    try {
      const user = login({ email, password })
      return user
    }
    catch (error) {
      setErrors(error)
    }
  }

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    errors,
    handleSignUp,
    handleSignIn,
  }
}

export default useEntryForm
