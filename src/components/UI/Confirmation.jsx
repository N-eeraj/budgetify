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
          <Button color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button color={actionColor} onClick={onConfirm}>
            { actionText }
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}
