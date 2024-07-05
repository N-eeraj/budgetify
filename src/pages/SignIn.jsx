// material ui imports
import TextField from '@mui/material/TextField'

// component imports
import EntryForm from '@components/EntryForm'
import Password from '@components/Password'

// hooks imports
import useEntryForm from '@hooks/useEntryForm'

export default function SignIn() {
  const {
    email, setEmail,
    password, setPassword,
    errors,
    handleSignIn,
  } = useEntryForm()

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
      <Password
        value={password}
        error={!!errors.password}
        helperText={errors.password}
        independentToggle
        onChange={setPassword} />
    </EntryForm>
  )
}
