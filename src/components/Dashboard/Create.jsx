// material ui imports
import { Autocomplete, TextField } from '@mui/material'

export default function Create({ type, name, setName, amount, setAmount, budget, setBudget, errors }) {
  const budgets = [{id: 1, name: 'text1'}, {id: 2, name: 'text 2'}]

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
          value={budget}
          options={budgets}
          getOptionLabel={({ name }) => name}
          clearOnBlur
          renderInput={(params) => <TextField {...params} label="Select Budget" />}
          onChange={(_, { id }) => console.log(id)}
        />
      }
    </>
  )
}
