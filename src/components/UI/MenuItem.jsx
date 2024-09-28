// material ui imports
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

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
