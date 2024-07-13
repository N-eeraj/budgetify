// redux toolkit imports
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '@store/main'

// material ui imports
import { Snackbar, Alert } from '@mui/material'

export default function Toast() {
  const { show, type, text } = useSelector(({ main }) => main.toast)
  const dispatch = useDispatch()

  return (
    <Snackbar
      open={show}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      onClose={() => dispatch(setToast())}>
      <Alert
        severity={type}
        variant="filled"
        sx={{
          width: '100%',
          color: 'white',
        }}
        onClose={() => dispatch(setToast())}>
        { text }
      </Alert>
    </Snackbar>
  )
}
