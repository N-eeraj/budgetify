// react imports
import { useState } from 'react'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { createExpense, updateExpense, removeExpense } from '@store/expenses'
import { getBudget } from '@store/budgets'

const useExpense = defaultValues => {
  // form states
  const [name, setName] = useState(defaultValues?.name ?? '')
  const [amount, setAmount] = useState(defaultValues?.amount ?? '')
  const [budget, setBudget] = useState(defaultValues?.budget ?? null)
  const [errors, setErrors] = useState({})
  const [editingExpense, setEditingExpense] = useState(null)
  const [deletingExpense, setDeletingExpense] = useState(null)

  const dispatch = useDispatch()

  // store values
  const { budgets, expenses } = useSelector(({ budgets, expenses }) => ({
    budgets: budgets.data,
    expenses: expenses.data.map((expense) => ({
      budgetName: getBudget(budgets, expense.budget).name,
      ...expense,
    }))
  }))

  // clearing form
  const resetForm = () => {
    setName('')
    setAmount('')
    setBudget(null)
    setErrors({})
  }

  // expense creation function
  const handleCreate = () => {
    setErrors({})
    try {
      if (!budget)
        throw { budget: 'Please select a budget' }
      const { payload } = dispatch(createExpense({ name, amount, budget }))
      resetForm()
      return payload
    }
    catch(error) {
      setErrors(error)
    }
  }

  // open edit modal with prefilled values
  const handleEdit = id => {
    setEditingExpense(id)
    const { name, amount, budget } = expenses.find(budget => budget.id === id)
    setName(name)
    setAmount(amount)
    setBudget(budget)
  }

  // expense updation function
  const handleUpdate = () => {
    setErrors({})
    try {
      if (!budget)
        throw { budget: 'Please select a budget' }
      dispatch(updateExpense({ id: editingExpense, name, amount, budget }))
      setEditingExpense(null)
    }
    catch(error) {
      setErrors(error)
    }
  }

  // expense deletion function
  const deleteExpense = () => {
    dispatch(removeExpense(deletingExpense))
    setDeletingExpense(null)
  }

  // closing dialog & clear form states
  const handleDialogClose = () => {
    setEditingExpense(null)
    resetForm()
  }

  return {
    expenses,
    budgets,
    name, setName,
    amount, setAmount,
    budget, setBudget,
    errors,
    editingExpense, setEditingExpense,
    deletingExpense, setDeletingExpense,
    handleCreate,
    handleEdit,
    handleUpdate,
    deleteExpense,
    handleDialogClose,
  }
}

export default useExpense
