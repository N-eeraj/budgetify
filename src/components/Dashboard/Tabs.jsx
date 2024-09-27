// react imports
import { useState, useEffect } from 'react'

// react router imports
import { useNavigate, useLocation } from 'react-router'

// material ui imports
import { Tabs, Tab } from '@mui/material'

const tabs = [ 'Budgets', 'Expenses' ]

export default function DashboardTabs() {
  const { pathname } = useLocation()
  const tab = pathname.split('/').at(-1)
  const navigate = useNavigate()

  const [currentTab, setCurrentTab] = useState()

  useEffect(() => {
    setCurrentTab(tab)
  }, [pathname])

  const handleTabChange = (_, value) => {
    setCurrentTab(value)
    navigate(`/dashboard/${value}`)
  }

  return (
    tabs.some(tab => tab.toLowerCase() === currentTab) &&
      <Tabs variant="fullWidth" value={currentTab} onChange={handleTabChange}>
        { tabs.map(tab => (
            <Tab
              label={tab}
              value={tab.toLowerCase()}
              sx={{ textTransform: { md: 'none' } }}
              key={tab} />
        )) }
      </Tabs>
  )
}
