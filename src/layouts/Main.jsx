// react-router-dom imports
import { Outlet } from 'react-router'

// theme imports
import Theme from '@theme'

export default function Main() {

  return (
    <Theme>
      <Outlet />
    </Theme>
  )
}
