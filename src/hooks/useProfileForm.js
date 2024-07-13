// react imports
import { useState } from 'react'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, deleteUser } from '@store/users'
import { setUser, setToast } from '@store/main'

// utils imports
import { clearBudgets } from '@utils/budget'
import { clearExpenses } from '@utils/expense'

const useProfileForm = () => {
  // store values
  const { user } = useSelector(({ main }) => main)
  const dispatch = useDispatch()

  // form states
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  // update profile function
  const handleUpdate = event => {
    event.preventDefault()
    setErrors({})
    try {
      const { payload } = dispatch(updateUser({ id: user.id, name, email, password }))
      dispatch(setUser(payload))
      dispatch(setToast({
        show: true,
        type: 'success',
        text: 'Updated Profile!',
      }))
    }
    catch (error) {
      setErrors(error)
    }
  }

  // delete profile function
  const handleDelete = () => {
    clearBudgets()
    clearExpenses()
    dispatch(deleteUser(user.id))
    dispatch(setUser(null))
    setDeleteConfirmation(false)
  }

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    errors,
    deleteConfirmation, setDeleteConfirmation,
    handleUpdate,
    handleDelete,
  }
}

export default useProfileForm
