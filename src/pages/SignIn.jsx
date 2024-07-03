// react imports
import { useState } from 'react'

// redux toolkit imports
import { useSelector } from 'react-redux'
import { getUser } from '@store/users'

// material ui imports
import { Grid, Card, Typography, Stack, TextField, Button, FormControlLabel, Checkbox } from '@mui/material'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const login = useSelector(({ users }) => getUser(users))

  const handleSignIn = event => {
    event.preventDefault()
    setErrors({})
    try {
      console.log(login({ email, password }))
    }
    catch (error) {
      setErrors(error)
    }
  }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{
      height: '100vh',
      backgroundColor: ({ palette }) => palette.primary.contrastText,
    }}>
      <Card elevation={0} sx={{
        display: 'grid',
        placeItems: 'center',
        width: 1,
        maxWidth: 'md',
        height: 1,
        maxHeight: {
          md: '384px',
        },
        paddingX: {
          xs: 3,
          md: '36px',
        },
        paddingBottom: {
          xs: 12,
          md: 2,
        },
        borderRadius: {
          md: '28px',
        },
      }}>
        <Stack
          direction={{ md: 'row' }}
          justifyContent="space-between"
          rowGap={4}
          columnGap={12}
          width={1}
          maxWidth={{ xs: 400, md: 1 }}>
          <Typography component="h1" sx={{
            fontSize: {
              xs: '32px',
              md: '36px',
            },
            fontWeight: 400,
          }}>
            Sign in
          </Typography>

          <form onSubmit={handleSignIn}>
            <Stack rowGap={2} minWidth={{ md: 'max(30vw, 400px)' }} maxWidth={400}>
              <TextField
                value={email}
                label="Email"
                variant="outlined"
                type="email"
                required
                autoFocus
                error={!!errors.email}
                helperText={errors.email}
                onChange={({ target }) => setEmail(target.value)} />
              <Stack>
                <TextField
                  value={password}
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  required
                  error={!!errors.password}
                  helperText={errors.password}
                  onChange={({ target }) => setPassword(target.value)} />
                <FormControlLabel control={
                    <Checkbox checked={showPassword} onChange={({ target }) => setShowPassword(target.checked)} />
                  } label="Show Password" />
              </Stack>
              <Button variant="contained" type="submit" sx={{
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
                alignSelf: 'flex-end',
                paddingX: 4,
                borderRadius: 5,
              }}>
                Sign in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Grid>
  )
}
