// react imports
import { useState } from 'react'

// redux toolkit & store imports
import { useDispatch } from 'react-redux'
import { createUser } from '@store/users'

// material ui imports
import { Grid, Card, Typography, alpha, Stack, TextField, Button, FormControlLabel, Checkbox } from '@mui/material'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const handleSignUp = event => {
    event.preventDefault()
    setErrors({})
    try {
      dispatch(createUser({ name, email, password }))
    }
    catch (error) {
      setErrors(error)
    }
  }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{
      height: '100vh',
      backgroundColor: ({ palette }) => alpha(palette.primary.main, 0.1),
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
        backgroundColor: 'white',
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
            Sign up
          </Typography>

          <form onSubmit={handleSignUp}>
            <Stack rowGap={2} minWidth={{ md: 'max(30vw, 400px)' }} maxWidth={400}>
              <TextField
                value={name}
                label="Name"
                variant="outlined"
                required
                autoFocus
                error={!!errors.name}
                helperText={errors.name}
                onChange={({ target }) => setName(target.value)} />
              <TextField
                value={email}
                label="Email"
                variant="outlined"
                type="email"
                required
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
                Sign up
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Grid>
  )
}
