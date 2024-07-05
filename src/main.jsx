// react imports
import React from 'react'
import { createRoot } from 'react-dom/client'

// react router imports
import { RouterProvider } from 'react-router-dom'
import router from '@router'

// style imports
import '@styles/app.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
