// react imports
import { useState } from 'react'

const useExpense = defaultValues => {
  // form states
  const [name, setName] = useState(defaultValues?.name ?? '')
  const [amount, setAmount] = useState(defaultValues?.amount ?? '')
  const [errors, setErrors] = useState({})

  const handleCreate = () => {
    console.log({ name, amount })
  }

  return {
    name, setName,
    amount, setAmount,
    errors,
    handleCreate,
  }
}

export default useExpense
