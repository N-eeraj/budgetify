// react imports
import React from 'react'
import { createRoot } from 'react-dom/client'

// react router imports
import { RouterProvider } from 'react-router-dom'
import router from '@router'

// material ui imports
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

// style imports
import '@style/app.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
