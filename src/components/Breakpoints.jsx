import useMediaQuery from '@mui/material/useMediaQuery'

export const SmallScreen = ({ children }) => {
  const isSmallScreen = useMediaQuery(({ breakpoints }) => breakpoints.down('md'))

  return isSmallScreen && children
}

export const LargeScreen = ({ children }) => {
  const isLargeScreen = useMediaQuery(({ breakpoints }) => breakpoints.up('md'))

  return isLargeScreen && children
}
