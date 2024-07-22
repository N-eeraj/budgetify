// react router import
import { useNavigate, useRouteError } from 'react-router'

// material ui imports
import { Stack, Typography, Button } from '@mui/material'

export default function Error() {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <Stack
      height="100dvh"
      justifyContent="center"
      alignItems="center"
      rowGap={3}>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        color="text.secondary">
        { error }
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}>
        Return Home
      </Button>
    </Stack>
  )
}
