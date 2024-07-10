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
  const [editingBudget, setEditingBudget] = useState(null)
  const [deletingBudget, setDeletingBudget] = useState(null)

  const dispatch = useDispatch()
  const budgets = useSelector(({ budgets }) => budgets.data)

  const resetForm = () => {
    setName('')
    setAmount('')
  }

  const handleCreate = () => {
    setErrors({})
    try {
      const { payload } = dispatch(createBudget({ name, amount }))
      resetForm()
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
    editingBudget, setEditingBudget,
    deletingBudget, setDeletingBudget,
    resetForm,
    handleCreate,
  }
}

export default useBudget
