// material ui imports
import TextField from '@mui/material/TextField'

// component imports
import EntryForm from '@components/EntryForm'
import Password from '@components/Password'

// hooks imports
import useEntryForm from '@hooks/useEntryForm'

export default function SignUp() {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    errors,
    handleSignUp,
  } = useEntryForm()

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
      <Password
        value={password}
        error={!!errors.password}
        helperText={errors.password}
        independentToggle
        onChange={setPassword} />
    </EntryForm>
  )
}
