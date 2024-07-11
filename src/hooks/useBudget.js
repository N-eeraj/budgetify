// react imports
import { useState } from 'react'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { createBudget, updateBudget, removeBudget } from '@store/budgets'
import { getExpensesByBudget } from '@store/expenses'

const useBudget = defaultValues => {
  // form states
  const [name, setName] = useState(defaultValues?.name ?? '')
  const [amount, setAmount] = useState(defaultValues?.amount ?? '')
  const [errors, setErrors] = useState({})
  const [editingBudget, setEditingBudget] = useState(null)
  const [deletingBudget, setDeletingBudget] = useState(null)

  const dispatch = useDispatch()
  const budgets = useSelector(({ budgets, expenses }) => (
    budgets.data.map(budget => ({
      spent: getExpensesByBudget(expenses, budget.id).reduce((sum, { amount }) => sum + amount, 0),
      ...budget,
    }))
  ))

  const resetForm = () => {
    setName('')
    setAmount('')
    setErrors({})
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

  const handleEdit = id => {
    setEditingBudget(id)
    const { name, amount } = budgets.find(budget => budget.id === id)
    setName(name)
    setAmount(amount)
  }

  const handleUpdate = () => {
    setErrors({})
    try {
      dispatch(updateBudget({ id: editingBudget, name, amount }))
      setEditingBudget(null)
    }
    catch(error) {
      setErrors(error)
    }
  }

  const deleteBudget = () => {
    dispatch(removeBudget(deletingBudget))
    setDeletingBudget(null)
  }

  const handleDialogClose = () => {
    setEditingBudget(null)
    resetForm()
  }

  return {
    budgets,
    name, setName,
    amount, setAmount,
    errors,
    editingBudget, setEditingBudget,
    deletingBudget, setDeletingBudget,
    handleCreate,
    handleEdit,
    handleUpdate,
    deleteBudget,
    handleDialogClose,
  }
}

export default useBudget
