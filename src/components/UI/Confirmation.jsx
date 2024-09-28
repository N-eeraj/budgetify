// material ui imports
import Dialog from '@mui/material/Dialog'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

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
