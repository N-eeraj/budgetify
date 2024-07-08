// material ui imports
import { TextField } from '@mui/material'

export default function ExpenseCreate() {
  return (
    <>
      <TextField
        label="Expense Name"
        variant="outlined"
        required
        fullWidth />
      <TextField
        label="Amount"
        variant="outlined"
        type="number"
        required
        fullWidth />
    </>
  )
}
