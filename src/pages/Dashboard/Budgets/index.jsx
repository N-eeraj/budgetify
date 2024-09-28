// react imports
import { useState } from 'react'

// material ui imports
import { Stack, Typography } from '@mui/material'

// react router imports
import { useParams, useNavigate } from 'react-router'

// material ui imports
import { Tabs, Tab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowDropUp from '@mui/icons-material/ArrowDropUp'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'

// component imports
import BudgetCard from '@components/Dashboard/Budget'
import ExpenseList from '@components/Dashboard/Expense/List'
import Allocation from '@components/Dashboard/Allocation'
import BackNavigation from '@components/UI/BackNavigation'
import OptionsMenu from '@components/UI/OptionsMenu'
import Create from '@components/Dashboard/Create'
import CreateDialog from '@components/Dashboard/Create/Dialog'
import Confirmation from '@components/UI/Confirmation'

// hooks imports
import useBudget from '@hooks/useBudget'

const tabs = [ 'Expenses', 'Allocations' ]
const checkIsExpenses = value => value === 'Expenses'

export default function Budget() {
  const {
    getBudget,
    getExpenses,
    getAllocations,
    allocatingBudgetName,
    allocatingBudget,
    setAllocatingBudget,
    handleAllocate,
    deletingBudget,
    setDeletingBudget,
    deleteBudget,
    ...createProps
  } = useBudget()

  const { id } = useParams()
  const navigate = useNavigate()

  const [currentTab, setCurrentTab] = useState(tabs[0])

  const budgetDetails = getBudget(id)
  const expenses = getExpenses(id)
  const allocations = getAllocations(id)

  const actions = [
    {
      text: 'New Expense',
      icon: <AddIcon />,
      onClick: () => navigate('/dashboard/expenses', { state: { budget: id } }),
    },
    {
      text: 'New Allocation',
      icon: <MonetizationOnIcon />,
      onClick: () => setAllocatingBudget(id),
    },
    {
      text: 'Edit',
      icon: <EditIcon />,
      onClick: () => navigate('/dashboard/budgets', { state: { id } }),
    },
    {
      text: 'Delete',
      icon: <DeleteIcon />,
      onClick: () => setDeletingBudget(id),
    },
  ]

  const handleDelete = () => {
    deleteBudget()
    navigate('/dashboard/budgets')
  }

  return (
    <>
      <Stack rowGap={3}>
        <Stack direction="row" justifyContent="space-between">
          <BackNavigation />
          <OptionsMenu actions={actions} />
        </Stack>

        <Stack rowGap={1}>
          <Typography variant="h5" component="h1" color="text.disabled">
            Budget Details
          </Typography>
          <BudgetCard {...budgetDetails} hasActions={false} />
        </Stack>

        <Stack>
          <Tabs
            variant="fullWidth"
            value={currentTab}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: ({ palette }) => checkIsExpenses(currentTab) ? palette.error.main : palette.success.main
              }
            }}
            onChange={(_, tab) => setCurrentTab(tab)}>
            { tabs.map(tab => (
                <Tab
                  label={(
                    <Stack direction="row" alignItems="center">
                      <span>
                        {tab}
                      </span>
                      {checkIsExpenses(tab) ? <ArrowDropDown /> : <ArrowDropUp />}
                    </Stack>
                  )}
                  value={tab}
                  sx={{
                    textTransform: { md: 'none' },
                    color: ({ palette }) => checkIsExpenses(tab) ? palette.error.main : palette.success.main,
                    '&.Mui-selected': {
                      color: ({ palette }) => checkIsExpenses(tab) ? palette.error.main : palette.success.main
                    }
                  }}
                  key={tab} />
              ))
            }
          </Tabs>
          {
            checkIsExpenses(currentTab) ?
              <ExpenseList
                expenses={expenses}
                fallbackText="Create an expense for this budget to show here" /> :
              <Stack>
                { allocations.map(({ id, budget, ...details }) => <Allocation key={id} {...details} />)}
              </Stack>
          }
        </Stack>
      </Stack>


      <CreateDialog
        label={`Allocate Fund for ${allocatingBudgetName}`}
        open={!!allocatingBudget}
        fields={<Create type="Allocation" {...createProps} />}
        onClose={() => setAllocatingBudget(null)}
        onSubmit={handleAllocate} />

      <Confirmation
        open={!!deletingBudget}
        title="Confirm Delete"
        actionText="Delete"
        onClose={() => setDeletingBudget(null)}
        onConfirm={handleDelete}>
        <Typography>
          Are you sure you want to delete this budget & all its expenses ?
        </Typography>
      </Confirmation>
    </>
  )
}
