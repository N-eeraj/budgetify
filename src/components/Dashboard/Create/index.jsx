// react imports
import { useEffect } from 'react'

// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

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
        sx={{
          width: {
            md: isExpense ? 1 : 'calc(50% - 8px)',
          }
        }}
        onChange={({ target }) => setName(target.value)}  />
      <TextField
        value={amount}
        label="Amount"
        variant="outlined"
        type="number"
        inputProps={{
          min: 0.01,
          step: 0.01,
        }}
        required
        error={!!errors.amount}
        helperText={errors.amount}
        sx={{
          width: {
            md: 'calc(50% - 8px)',
          }
        }}
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
            sx={{
              width: {
                md: 'calc(50% - 8px)',
              }
            }}
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
