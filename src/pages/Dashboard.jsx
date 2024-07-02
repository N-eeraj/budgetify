// redux toolkit imports
import { useDispatch } from 'react-redux'
import { toggleMode } from '@store/main'

// material ui imports
import { Button, Paper } from '@mui/material'

export default function Dashboard() {
  const dispatch = useDispatch()

  return (
    <Paper>
      <Button variant="contained" onClick={() => dispatch(toggleMode())}>
        Toggle Mode
      </Button>
    </Paper>
  )
}
