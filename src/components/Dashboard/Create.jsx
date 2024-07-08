// material ui imports
import { TextField } from '@mui/material'

export default function Create({ type, name, setName, amount, setAmount, errors }) {
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
    </>
  )
}
