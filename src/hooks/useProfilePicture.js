// react imports
import { useState } from 'react'

// redux toolkit imports
import { useSelector, useDispatch } from 'react-redux'
import { setProfilePicture } from '@store/main'
import { updateUser } from '@store/users'

// utils imports
import profileImages from '@utils/profileImages'

const useProfilePicture = () => {
  const [open, setOpen] = useState(false)

  const { image } = useSelector(({ main }) => main.user)
  const dispatch = useDispatch()

  const changeProfilePicture = value => {
    const { payload } = dispatch(setProfilePicture(value))
    dispatch(updateUser(payload))
  }

  return {
    open, setOpen,
    image,
    profileImages,
    changeProfilePicture
  }
}

export default useProfilePicture
