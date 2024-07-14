// react imports
import { useState } from 'react'

// material ui imports
import { Stack, TextField, FormControlLabel, Checkbox, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

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
      { showPassword ? <VisibilityOff /> : <Visibility /> }
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
