// react imports
import { useState } from 'react'

// material ui imports
import {  Dialog } from '@mui/material'

// component imports
import ProfileAvatar from '@components/Dashboard/Profile/Avatar'

export default function ProfilePicture() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ProfileAvatar
        sx={{
          width: 'min(80vw, 120px)',
          height: 'min(80vw, 120px)',
        }}
        onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)}>
      </Dialog>
    </>
  )
}
