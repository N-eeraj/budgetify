// react imports
import { useEffect, useState } from 'react'

// react router imports
import { useLocation } from 'react-router'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { createBudget, updateBudget, removeBudget } from '@store/budgets'
import { getExpensesByBudget, removeExpensesByBudget } from '@store/expenses'
import { setToast } from '@store/main'

const useBudget = defaultValues => {
  // form states
  const [name, setName] = useState(defaultValues?.name ?? '')
  const [amount, setAmount] = useState(defaultValues?.amount ?? '')
  const [errors, setErrors] = useState({})
  const [editingBudget, setEditingBudget] = useState(null)
  const [deletingBudget, setDeletingBudget] = useState(null)

  // edit budget via budget page
  const { state: budget } = useLocation()
  window.history.replaceState({}, '')
  useEffect(() => {
    if (budget) {
      handleEdit(budget.id)
    }
  }, [])

  const dispatch = useDispatch()

  // store values
  const { budgets, getExpenses } = useSelector(({ budgets, expenses }) => ({
    budgets: budgets.data.map(budget => ({
      spent: getExpensesByBudget(expenses, budget.id).reduce((sum, { amount }) => sum + amount, 0),
      ...budget,
    })),
    getExpenses: id => (
      getExpensesByBudget(expenses, id)
    )
  }))

  // function to get budget details by id
  const getBudget = id => {
    const budget = budgets.find(budget => budget.id === id)
    if (budget) return budget
    throw 'Budget Not Found'
  }

  // clearing form
  const resetForm = () => {
    setName('')
    setAmount('')
    setErrors({})
  }

  // budget creation function
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

  // open edit modal with prefilled values
  const handleEdit = id => {
    setEditingBudget(id)
    const { name, amount } = budgets.find(budget => budget.id === id)
    setName(name)
    setAmount(amount)
  }

  // budget updation function
  const handleUpdate = () => {
    setErrors({})
    try {
      const { spent } = budgets.find(({ id }) => id === editingBudget)
      if (spent > amount)
        throw { amount: 'Budget amount cannot be lower than spent amount' }
      dispatch(updateBudget({ id: editingBudget, name, amount }))
      setEditingBudget(null)
    }
    catch(error) {
      setErrors(error)
    }
  }

  // budget deletion function
  const deleteBudget = () => {
    dispatch(removeBudget(deletingBudget))
    dispatch(removeExpensesByBudget(deletingBudget))
    setDeletingBudget(null)
    dispatch(setToast({
      show: true,
      type: 'success',
      text: 'Deleted Budget',
    }))
  }

  // closing dialog & clear form states
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
    getBudget, getExpenses,
    handleCreate,
    handleEdit,
    handleUpdate,
    deleteBudget,
    handleDialogClose,
  }
}

export default useBudget
