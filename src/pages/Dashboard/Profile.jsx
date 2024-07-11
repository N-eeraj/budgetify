// react router imports
import { useNavigate } from 'react-router'

// material ui imports
import { Stack, IconButton, TextField, Button, Snackbar, Alert } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

// component imports
import ProfilePicture from '@components/Dashboard/Profile/Picture'
import Password from '@components/UI/Password'

// hooks imports
import useProfileForm from '@hooks/useProfileForm'

export default function Profile() {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    showSnackbar, setShowSnackbar,
    errors,
    handleUpdate,
  } = useProfileForm()

  const navigate = useNavigate()

  const halfWidth = {
    xs: 1,
    md: 'calc(50% - 20px)',
  }

  return (
    <>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>

      <Stack
        component="form"
        direction={{ md: 'row' }}
        justifyContent="space-evenly"
        alignItems={{ md: 'flex-end' }}
        rowGap={3}
        columnGap={10}
        paddingTop={{ xs: 5, md: 10 }}
        onSubmit={handleUpdate}>
        <Stack direction="row" justifyContent="center" alignItems="center" rowGap={{ xs: 2, md: 3 }} columnGap={5} flexWrap="wrap" maxWidth="md">
          <Stack alignItems="center" width={1}>
            <ProfilePicture />
          </Stack>

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
            sx={{ height: 56, width: halfWidth }}>
            Update Details
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ height: 56, width: halfWidth }}>
            Delete Account
          </Button>
        </Stack>
      </Stack>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={() => setShowSnackbar(false)}>
        <Alert
          severity="success"
          variant="filled"
          color="primary"
          sx={{
            width: '100%',
            color: 'white',
          }}
          onClose={() => setShowSnackbar(false)}>
          Updated Profile!
        </Alert>
      </Snackbar>
    </>
  )
}
