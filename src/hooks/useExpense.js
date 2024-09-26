// react imports
import { useEffect, useState } from 'react'

// react router imports
import { useLocation } from 'react-router'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { createExpense, updateExpense, removeExpense } from '@store/expenses'
import { getBudget } from '@store/budgets'
import { setToast } from '@store/main'

const useExpense = defaultValues => {
  // form states
  const [name, setName] = useState(defaultValues?.name ?? '')
  const [amount, setAmount] = useState(defaultValues?.amount ?? '')
  const [budget, setBudget] = useState(defaultValues?.budget ?? null)
  const [errors, setErrors] = useState({})
  const [editingExpense, setEditingExpense] = useState(null)
  const [deletingExpense, setDeletingExpense] = useState(null)

  // select budget for expense creation via budgets page
  const { state: budgetExpense } = useLocation()
  window.history.replaceState({}, '')
  useEffect(() => {
    if (budgetExpense) {
      setBudget(budgetExpense.budget)
    }
  }, [])

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
    const { name, amount, budget } = expenses.find(expense => expense.id === id)
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
      const { amount: budgetAmount } = getBudget({ data: budgets }, budget)
      const spentAmount = expenses.reduce((total, expense) => {
        if (expense.budget === budget && expense.id !== editingExpense)
          total += expense.amount
        return total
      }, 0)
      if (budgetAmount < spentAmount + Number(amount))
        throw { amount: 'Amount exceeds budget balance' }
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
    dispatch(setToast({
      show: true,
      type: 'success',
      text: 'Deleted Expense',
    }))
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
