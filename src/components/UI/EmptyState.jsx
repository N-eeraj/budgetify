// material ui imports
import { Stack, Typography } from '@mui/material'

export default function EmptyState({ image, title, body }) {
  return (
    <Stack
      rowGap={1}
      sx={{
        width: 1,
        maxWidth: 'min(360px, 90%)',
        marginTop: 8,
        marginX: 'auto',
      }}>
      <img src={image} />
      <Typography variant="h5" component="strong" color="text.secondary" align="center">
        { title }
      </Typography>
      <Typography variant="body2" component="span" color="text.disabled" align="center">
        { body }
      </Typography>
    </Stack>
  )
}
