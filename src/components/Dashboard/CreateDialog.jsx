// material ui imports
import { Dialog, Card, Stack, Button, Typography } from '@mui/material'

export default function CreateDialog({ open, label, fields, onClose, onSubmit }) {
  const handleSubmit = event => {
    event.preventDefault()
    if (onSubmit())
      onClose()
  }

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <Card sx={{
        width: '100%',
        padding: 3,
      }}>
        <form onSubmit={handleSubmit}>
          <Stack rowGap={3}>
            <Typography variant="h6">
              { label }
            </Typography>
            <Stack direction={{ md: 'row' }} gap={2}>
              { fields }
            </Stack>
            <Stack direction="row" justifyContent="flex-end" columnGap={2}>
              <Button type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </Stack>
          </Stack>
        </form>
      </Card>
    </Dialog>
  )
}
