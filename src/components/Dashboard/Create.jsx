// react imports
import { useEffect } from 'react'

// material ui imports
import { Autocomplete, TextField } from '@mui/material'

export default function Create({ type, name, setName, amount, setAmount, setBudget, errors, budgets }) {
  const isExpense = type === 'Expense'
  const singleBudget = budgets?.length === 1

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
            defaultValue={singleBudget ? budgets[0] : null}
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
            onChange={(_, { id }) => setBudget(id)} />
      }
    </>
  )
}
