// react imports
import { useState, useEffect } from 'react'

// react router imports
import { useLocation } from 'react-router'

// material ui imports
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import { lighten } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import CreateDialog from '@components/Dashboard/Create/Dialog'

export default function CreateFab({ tooltip, onClose, ...modalProps }) {
  const [openDialog, setOpenDialog] = useState(false)

  // open dialog for expense creation via budgets page
  const { state: budgetExpense } = useLocation()
  useEffect(() => {
    if (budgetExpense?.budget) {
      setOpenDialog(true)
    }
  }, [])

  const handleDialogClose = () => {
    onClose()
    setOpenDialog(false)
  }

  return (
    <>
      <CreateDialog {...modalProps} open={openDialog} onClose={handleDialogClose} />
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
