// react imports
import { useState } from 'react'

// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { createExpense } from '@store/expenses'

const useExpense = defaultValues => {
  // form states
  const [name, setName] = useState(defaultValues?.name ?? '')
  const [amount, setAmount] = useState(defaultValues?.amount ?? '')
  const [budget, setBudget] = useState(defaultValues?.budget ?? null)
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const { budgets, expenses } = useSelector(({ budgets, expenses }) => ({ budgets: budgets.data, expenses: expenses.data }))

  const handleCreate = () => {
    setErrors({})
    try {
      if (!budget)
        throw { budget: 'Please select a budget' }
      const { payload } = dispatch(createExpense({ name, amount, budget }))
      setName('')
      setAmount('')
      setBudget(null)
      return payload
    }
    catch(error) {
      setErrors(error)
    }
  }

  return {
    name, setName,
    amount, setAmount,
    budget, setBudget,
    errors,
    budgets,
    expenses,
    handleCreate,
  }
}

export default useExpense
