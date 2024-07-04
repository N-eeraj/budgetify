// react router imports
import { useNavigate } from 'react-router'

// redux toolkit imports
import { useDispatch } from 'react-redux'
import { setUser } from '@store/main'

// material ui imports
import { Grid, Card, Typography, Stack, Button, Divider } from '@mui/material'

export default function EntryForm({ title, tagline, actionText, redirect, onSubmit, children }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    const userData = onSubmit()
    if (userData) {
      dispatch(setUser(userData))
      navigate('/dashboard')
    }
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100vh',
        backgroundColor: 'primary.contrastText',
      }}>
      <Card elevation={0} sx={{
        display: 'grid',
        placeItems: 'center',
        width: 1,
        maxWidth: 'md',
        height: {
          xs: 1,
          md: 'fit-content',
        },
        paddingTop: 8,
        paddingBottom: 5,
        paddingX: {
          xs: 3,
          md: '36px',
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
          <Stack>
            <Typography component="h1" sx={{
              fontSize: {
                xs: '32px',
                md: '36px',
              },
              fontWeight: 400,
            }}>
              { title }
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 16 }}>
              { tagline }
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack rowGap={2} minWidth={{ md: 'max(30vw, 400px)' }} maxWidth={400}>
              { children }
              <Button variant="contained" type="submit" sx={{
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
                alignSelf: 'flex-end',
                paddingX: 4,
                borderRadius: 5,
              }}>
                { actionText }
              </Button>
              <Stack>
                <Divider />
                <Button sx={{
                    width: 'fit-content',
                    marginX: 'auto',
                    marginTop: 1,
                  }}
                  onClick={() => navigate(redirect.path)}>
                  { redirect.text }
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Grid>
  )
}
