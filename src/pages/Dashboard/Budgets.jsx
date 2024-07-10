// react imports
import { useState } from 'react'

// material ui imports
import { Typography } from '@mui/material'

// component imports
import CreateFab from '@components/Dashboard/CreateFab'
import Budget from '@components/Dashboard/Budget'
import Create from '@components/Dashboard/Create'
import Confirmation from '@components/UI/Confirmation'

// hooks imports
import useBudget from '@hooks/useBudget'

export default function Budgets() {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  const { budgets, handleCreate, ...createProps } = useBudget()

  const confirmDelete = id => {
    setDeleteConfirmation(true)
  }

  const deleteBudget = () => {
    console.log('delete budget')
    setDeleteConfirmation(false)
  }

  return (
    <>
      { budgets.map(budget => <Budget {...budget} onDelete={confirmDelete} key={budget.id} />) }

      <CreateFab
        tooltip="Create New Budget"
        fields={<Create type="Budget" {...createProps} />}
        label="Create Budget"
        onSubmit={handleCreate} />

      <Confirmation
        open={deleteConfirmation}
        title="Confirm Delete"
        actionText="Delete"
        onClose={() => setDeleteConfirmation(false)}
        onConfirm={deleteBudget}>
        <Typography>
          Are you sure you want to delete this budget & all its expenses ?
        </Typography>
      </Confirmation>
    </>
  )
}
