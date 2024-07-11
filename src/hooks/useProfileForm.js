// react imports
import { useState } from 'react'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'

const useProfileForm = () => {
  const { user } = useSelector(({ main }) => main)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const handleUpdate = event => {
    event.preventDefault()
    console.log({ name, email, password })
  }

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    errors,
    handleUpdate,
  }
}

export default useProfileForm
