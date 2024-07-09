// react imports
import { useState } from 'react'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { createBudget } from '@store/budgets'

const useBudget = defaultValues => {
  // form states
  const [name, setName] = useState(defaultValues?.name ?? '')
  const [amount, setAmount] = useState(defaultValues?.amount ?? '')
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const budgets = useSelector(({ budgets }) => budgets)

  const handleCreate = () => {
    setErrors({})
    try {
      const { payload } = dispatch(createBudget({ name, amount }))
      setName('')
      setAmount('')
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
    budgets,
    handleCreate,
  }
}

export default useBudget
