// react imports
import { useEffect } from 'react'

// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { Autocomplete, TextField } from '@mui/material'

export default function Create({ type, name, setName, amount, setAmount, budget, setBudget, errors }) {
  const budgets = useSelector(({ budgets }) => budgets.data)

  const isExpense = type === 'Expense'
  const singleBudget = budgets?.length === 1

  let value = null
  if (isExpense) {
    if (budget)
      value = budgets.find(({ id }) => id === budget)
    else if (singleBudget)
      value = budgets[0]
  }

  useEffect(() => {
    if (isExpense && singleBudget)
      setBudget(budgets[0].id)
  }, [])

  return (
    <>
      <TextField
        value={name}
        label={`${type} Name`}
        variant="outlined"
        required
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
        onChange={({ target }) => setName(target.value)}  />
      <TextField
        value={amount}
        label="Amount"
        variant="outlined"
        type="number"
        required
        fullWidth
        error={!!errors.amount}
        helperText={errors.amount}
        onChange={({ target }) => setAmount(target.value)}  />
      {
        isExpense &&
          <Autocomplete
            value={value}
            isOptionEqualToValue={({ id }, value) => id === value}
            options={budgets}
            getOptionLabel={({ name }) => name}
            disabled={singleBudget}
            clearOnBlur
            includeInputInList
            fullWidth
            renderInput={params => <TextField
              {...params}
              label="Select Budget"
              error={!!errors.budget}
              helperText={errors.budget} />}
            onChange={(_, value) => setBudget(value?.id)} />
      }
    </>
  )
}
