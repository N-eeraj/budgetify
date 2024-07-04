// react imports
import { useState } from 'react'

// redux toolkit imports
import { useSelector } from 'react-redux'
import { getUser } from '@store/users'

// material ui imports
import { Stack, TextField, FormControlLabel, Checkbox } from '@mui/material'

// component imports
import EntryForm from '@component/EntryForm'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const login = useSelector(({ users }) => getUser(users))

  const handleSignIn = () => {
    setErrors({})
    try {
      return login({ email, password })
    }
    catch (error) {
      setErrors(error)
    }
  }

  return (
    <EntryForm
      title="Sign in"
      tagline="Use your Budgetify Account"
      actionText="Sign in"
      redirect={{
        path: '/sign-up',
        text: 'Don\'t have an account?',
      }}
      onSubmit={handleSignIn}>
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
    </EntryForm>
  )
}
