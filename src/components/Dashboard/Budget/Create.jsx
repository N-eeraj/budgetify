// material ui imports
import { TextField } from '@mui/material'

export default function BudgetCreate() {
  return (
    <>
      <TextField
        label="Budget Name"
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
