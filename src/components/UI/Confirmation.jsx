// material ui imports
import { Dialog, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material'

export default function Confirmation({ open, title, actionText='Continue', actionColor='primary', onClose, onConfirm, children }) {
  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <Card>
        <CardHeader title={title} />
        <CardContent sx={{ paddingY: 0 }}>
          { children }
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            color="inherit"
            sx={{ borderRadius: '20px' }}
            onClick={onClose}>
            Cancel
          </Button>
          <Button
            color={actionColor}
            sx={{ borderRadius: '20px' }}
            onClick={onConfirm}>
            { actionText }
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}
