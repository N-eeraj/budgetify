// react router imports
import { Outlet } from 'react-router'

// redux toolkit imports
import { Provider } from 'react-redux'
import store from '@store'

// theme imports
import Theme from '@theme'

// material ui imports
import Paper from '@mui/material/Paper'

// component imports
import Toast from '@components/UI/Toast'

export default function Main() {
  return (
    <Provider store={store}>
      <Theme>
        <Paper
          square
          component="main"
          sx={{
            minHeight: '100dvh',
          }}>
          <Outlet />
        </Paper>

        <Toast />
      </Theme>
    </Provider>
  )
}
