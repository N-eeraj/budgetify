// react router imports
import { Link } from 'react-router-dom'

// material ui imports
import {
  Container,
  Stack,
  Typography,
  Button,
} from '@mui/material'

// style imports
import style from '@style/home.module.css'

// asset imports
import decoration from '@image/decoration.svg'

export default function () {
  return (
    <Container component="main" maxWidth="false" sx={{
      display: 'flex',
      flexDirection: {
        xs: 'column',
        md: 'row',
      },
      justifyContent: {
        xs: 'flex-end',
        md: 'space-around',
      },
      rowGap: '10vh',
      columnGap: '50px',
      alignItems: 'center',
      minHeight: '100vh',
      paddingX: {
        md: 'max(calc(50vw - 600px), 50px)',
      },
      paddingBottom: {
        xs: '5vh',
        md: '10vh',
      },
    }}>

      <Stack spacing={2} maxWidth="md" alignItems="self-start">
        <Typography variant="h3" component="h1" color="primary">
          Take Control of Your Money
        </Typography>
        <Typography variant="subtitle1" component="h2">
          Personal budgeting is the secret to financial freedom. Start your journey today.
        </Typography>
        <Link to="/sign-in" className={style.cta}>
          <Button fullWidth variant="contained" sx={{ borderRadius: 5 }}>
            Sign in
          </Button>
        </Link>
      </Stack>

      <img src={decoration} alt="decoration" className={style.decorationImage} />
    </Container>
  )
}
