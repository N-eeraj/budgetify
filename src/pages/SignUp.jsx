// react imports
import { useState } from 'react'

// redux toolkit & store imports
import { useDispatch } from 'react-redux'
import { createUser } from '@store/users'

// material ui imports
import { Stack, TextField, FormControlLabel, Checkbox } from '@mui/material'

// component imports
import EntryForm from '@component/EntryForm'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const handleSignUp = () => {
    setErrors({})
    try {
      const { payload } = dispatch(createUser({ name, email, password }))
      return payload
    }
    catch (error) {
      setErrors(error)
    }
  }

  return (
    <EntryForm
      title="Sign up"
      tagline="Create a Budgetify Account"
      actionText="Sign up"
      redirect={{
        path: '/sign-in',
        text: 'Already have an account?',
      }}
      onSubmit={handleSignUp}>
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
    </EntryForm>
  )
}
