// react imports
import { useMemo } from 'react'

// material ui imports
import { ThemeProvider, createTheme } from '@mui/material'

// theme imports
import darkTheme from '@theme/dark'
import lightTheme from '@theme/light'

export default function Theme({ children }) {
  const mode = 'dark'

  const theme = useMemo(() => createTheme({
    palette: mode === 'dark' ? darkTheme : lightTheme,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none'
          }
        }
      }
    }
  }), [mode])

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
