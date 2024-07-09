// react imports
import { useState } from 'react'

const useExpense = defaultValues => {
  // form states
  const [name, setName] = useState(defaultValues?.name ?? '')
  const [amount, setAmount] = useState(defaultValues?.amount ?? '')
  const [budget, setBudget] = useState(defaultValues?.budget ?? null)
  const [errors, setErrors] = useState({})

  const handleCreate = () => {
    console.log({ name, amount })
  }

  return {
    name, setName,
    amount, setAmount,
    budget, setBudget,
    errors,
    handleCreate,
  }
}

export default useExpense
