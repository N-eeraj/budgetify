// react imports
import { useState } from 'react'

// material ui imports
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function Password({ independentToggle = false, containerProps, ...props }) {
  const [showPassword, setShowPassword] = useState(false)

  const toggleProps = { showPassword, setShowPassword }

  return (
    <Stack {...containerProps}>
      <TextField
        {...props}
        label="Password"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        InputProps={{ endAdornment: !independentToggle && <InlineToggle {...toggleProps} /> }}
        onChange={({ target }) => props.onChange(target.value)} />
      { independentToggle && <IndependentToggle {...toggleProps} /> }
    </Stack>
  )
}

const InlineToggle = ({ showPassword, setShowPassword }) => {
  return (
    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
      { showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> }
    </IconButton>
  )
}

const IndependentToggle = ({ showPassword, setShowPassword }) => {
  return (
    <FormControlLabel
      label="Show Password"
      control={
        <Checkbox
          checked={showPassword}
          onChange={({ target }) => setShowPassword(target.checked)} />
      } />
  )
}
