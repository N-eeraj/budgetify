// react imports
import { useState } from 'react'

// react router imports
import { useNavigate, useLocation } from 'react-router'

// material ui imports
import { Tabs, Tab } from '@mui/material'

export default function DashboardTabs() {
  const { pathname } = useLocation()
  const tab = pathname.split('/').at(-1)
  const navigate = useNavigate()

  const [currentTab, setCurrentTab] = useState(tab ?? 'budgets')

  const handleTabChange = (_, value) => {
    setCurrentTab(value)
    navigate(`/dashboard/${value}`)
  }

  return (
    <Tabs variant="fullWidth" value={currentTab} onChange={handleTabChange}>
      <Tab label="Budgets" value="budgets" />
      <Tab label="Expenses" value="expenses" />
    </Tabs>
  )
}
