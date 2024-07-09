// react imports
import { useState } from 'react'

// material ui imports
import { Fab, Tooltip, lighten } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CreateDialog from '@components/Dashboard/CreateDialog'

export default function CreateFab({ tooltip, ...modalProps }) {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <CreateDialog {...modalProps} open={openDialog} onClose={() => setOpenDialog(false)} />
      <Tooltip title={tooltip} placement="top-start">
        <Fab
          sx={{
            position: 'fixed',
            bottom: 'min(5vw, 20px)',
            right: 'min(5vw, 20px)',
            backgroundColor: ({ palette }) => lighten(palette.primary.main, palette.mode === 'light' && 0.5),
            borderRadius: 3,
            ':hover': {
              backgroundColor: ({ palette }) => palette.primary[palette.mode],
            },
          }}
          onClick={() => setOpenDialog(true)}>
          <AddIcon color="action" fontSize="large" />
        </Fab>
      </Tooltip>
    </>
  )
}
