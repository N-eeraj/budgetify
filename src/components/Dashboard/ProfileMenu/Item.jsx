import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'

export default function ProfileMenuItem({ text, icon, onClick }) {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        { icon }
      </ListItemIcon>
      <ListItemText>
        { text }
      </ListItemText>
    </MenuItem>
  )
}
