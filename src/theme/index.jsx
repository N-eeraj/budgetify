// react imports
import { useMemo } from 'react'

// redux toolkit imports
import { useSelector } from 'react-redux'

// material ui imports
import { ThemeProvider, createTheme } from '@mui/material/styles'

// theme imports
import darkTheme from '@theme/dark'
import lightTheme from '@theme/light'

export default function Theme({ children }) {
  const { mode } = useSelector(({ main }) => main)

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'dark' ? darkTheme : lightTheme),
    },
    typography: {
      fontFamily: '"Google Sans", roboto, "Noto Sans Myanmar UI", arial, sans-serif',
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiChip: {
        defaultProps: {
          variant: mode === 'dark' ? 'outlined' : 'filled'
        },
      }
    }
  }), [mode])

  return (
    <ThemeProvider theme={theme}>
      { children }
    </ThemeProvider>
  )
}
