// material ui imports
import { Grid, Card, Typography, alpha, Stack, TextField, Button, FormControlLabel, Checkbox } from '@mui/material'

export default function SignIn() {
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
            Sign in
          </Typography>

          <form>
            <Stack rowGap={2} minWidth={{ md: 'max(30vw, 400px)' }} maxWidth={400}>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                autoFocus />
              <Stack>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password" />
                <FormControlLabel control={<Checkbox />} label="Show Password" />
              </Stack>
              <Button variant="contained" sx={{
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
                alignSelf: 'flex-end',
                paddingX: 4,
                borderRadius: 5,
              }}>
                Sign In
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Grid>
  )
}
