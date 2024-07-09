// react imports
import { useState } from 'react'

// redux toolkit imports
import { useDispatch } from 'react-redux'
import { createBudget } from '@store/budgets'

const useBudget = defaultValues => {
  // form states
  const [name, setName] = useState(defaultValues?.name ?? '')
  const [amount, setAmount] = useState(defaultValues?.amount ?? '')
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const handleCreate = () => {
    setErrors({})
    try {
      const { payload } = dispatch(createBudget({ name, amount }))
      return payload
    }
    catch(error) {
      setErrors(error)
    }
  }

  return {
    name, setName,
    amount, setAmount,
    errors,
    handleCreate,
  }
}

export default useBudget
