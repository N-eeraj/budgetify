// reduct toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { Autocomplete, TextField } from '@mui/material'

export default function Create({ type, name, setName, amount, setAmount, setBudget, errors }) {
  const budgets = useSelector(({ budgets }) => budgets)

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
        type === 'Expense' &&
        <Autocomplete
          isOptionEqualToValue={({ id }, value) => id === value}
          options={budgets}
          getOptionLabel={({ name }) => name}
          clearOnBlur
          includeInputInList
          renderInput={(params) => <TextField {...params} label="Select Budget" />}
          onChange={(_, { id }) => setBudget(id)}
        />
      }
    </>
  )
}
