// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// utils imports
import { formatAmount, formatDate } from '@utils/formatter'

export default function Allocation({ name, time: timeStamp, amount }) {
  const { mode } = useSelector(({ main }) => main)
  const { date, time} = formatDate(timeStamp)

  return (
    <Card
      elevation={0}
      variant={mode === 'dark' ? 'filled' : 'outlined'}
      sx={{
        backgroundColor: ({ palette }) => palette.primary.contrastText,
      }}>
      <CardHeader
        title={name}
        titleTypographyProps={{
          variant: 'h5',
          component: 'h2',
        }}
        sx={{ paddingBottom: 1 }} />
      <CardContent sx={{ paddingY: 0 }}>
        <Stack>
          <Typography
            variant="h6"
            color={({ palette }) => palette.success.main}>
          { formatAmount(amount) }
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{
              color: ({ palette }) => palette.text[palette.mode === 'dark' ? 'disabled' : 'secondary']
            }}>
            { date }, { time }
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
