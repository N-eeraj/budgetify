// react router imports
import { Outlet } from 'react-router'

// redux toolkit & store imports
import { Provider } from 'react-redux'
import store from '@store'

// theme imports
import Theme from '@theme'

export default function Main() {

  return (
    <Provider store={store}>
      <Theme>
        <Outlet />
      </Theme>
    </Provider>
  )
}
