// material ui imports
import Dialog from '@mui/material/Dialog'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function CreateDialog({ isUpdate, open, label, fields, onClose, onSubmit }) {
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
            <Stack direction={{ md: 'row' }} gap={2} flexWrap="wrap">
              { fields }
            </Stack>
            <Stack direction="row" justifyContent="flex-end" columnGap={2}>
              <Button type="button" onClick={onClose} sx={{ borderRadius: '20px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ borderRadius: '20px' }}>
                { isUpdate ? 'Update' : 'Create' }
              </Button>
            </Stack>
          </Stack>
        </form>
      </Card>
    </Dialog>
  )
}
