// material ui imports
import { Fab, Tooltip, lighten } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export default function CreateFab(props) {
  return (
    <Tooltip {...props} placement="top-start">
      <Fab sx={{
        position: 'fixed',
        bottom: 'min(5vw, 20px)',
        right: 'min(5vw, 20px)',
        backgroundColor: ({ palette }) => lighten(palette.primary.main, palette.mode === 'light' && 0.5),
        borderRadius: 3,
        ':hover': {
          backgroundColor: ({ palette }) => palette.primary[palette.mode],
        },
      }}>
        <AddIcon color="action" fontSize="large" />
      </Fab>
    </Tooltip>
  )
}
