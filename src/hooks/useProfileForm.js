// react imports
import { useState } from 'react'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '@store/users'
import { setUser } from '@store/main'

const useProfileForm = () => {
  // store values
  const { user } = useSelector(({ main }) => main)
  const dispatch = useDispatch()

  // form states
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [errors, setErrors] = useState({})

  // profile updation function
  const handleUpdate = event => {
    event.preventDefault()
    setErrors({})
    try {
      const { payload } = dispatch(updateUser({ id: user.id, name, email, password }))
      dispatch(setUser(payload))
      setShowSnackbar(true)
    }
    catch (error) {
      setErrors(error)
    }
  }

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    showSnackbar, setShowSnackbar,
    errors,
    handleUpdate,
  }
}

export default useProfileForm
