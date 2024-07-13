// material ui imports
import { Stack, TextField, Button, Typography } from '@mui/material'

// component imports
import Password from '@components/UI/Password'
import Confirmation from '@components/UI/Confirmation'

// hooks imports
import useProfileForm from '@hooks/useProfileForm'

export default function Form() {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    errors,
    deleteConfirmation, setDeleteConfirmation,
    handleUpdate,
    handleDelete,
  } = useProfileForm()

  const halfWidth = {
    xs: 1,
    md: 'calc(50% - 20px)',
  }

  return (
    <>
      <Stack
        component="form"
        paddingTop={{ xs: 5, md: 10 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowGap={3}
        columnGap={5}
        flexWrap="wrap"
        maxWidth="md"
        marginX="auto"
        onSubmit={handleUpdate}>
        <TextField
          value={name}
          label="Name"
          variant="outlined"
          required
          fullWidth
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
          sx={{ width: halfWidth }}
          onChange={({ target }) => setEmail(target.value)} />
        <Password
          value={password}
          error={!!errors.password}
          helperText={errors.password}
          containerProps={{
            sx: { width: halfWidth },
          }}
          onChange={setPassword} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: halfWidth, paddingY: 1 }}>
          Update Details
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ width: halfWidth, paddingY: 1 }}
          onClick={() => setDeleteConfirmation(true)}>
          Delete Account
        </Button>
      </Stack>

      <Confirmation
        open={deleteConfirmation}
        title="Delete Confimation"
        actionText="Delete my account"
        actionColor="error"
        onClose={() => setDeleteConfirmation(false)}
        onConfirm={handleDelete}>
        <Typography variant="body2" color="text.disabled">
          You are about to delete your account.
          This action is reversible!
        </Typography>
        <Typography variant="body1" component="span" color="text.secondary">
          Are you sure you want to continue ?
        </Typography>
      </Confirmation>
    </>
  )
}
