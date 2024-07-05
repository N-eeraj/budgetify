// react router imports
import { Outlet } from 'react-router'

// redux toolkit & store imports
import { Provider } from 'react-redux'
import store from '@store'

// theme imports
import Theme from '@theme'

// material ui imports
import { Paper } from '@mui/material'

export default function Main() {
  return (
    <Provider store={store}>
      <Theme>
        <Paper square component="main" sx={{ minHeight: '100vh' }}>
          <Outlet />
        </Paper>
      </Theme>
    </Provider>
  )
}
