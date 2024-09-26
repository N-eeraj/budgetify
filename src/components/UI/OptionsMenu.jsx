// react imports
import { useState } from 'react'

// material ui imports
import { IconButton, Menu, Tooltip } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// component imports
import MenuItem from '@components/UI/MenuItem'

export default function OptionsMenu({ actions }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleItemClick = onClick => {
    onClick()
    setAnchorEl(null)
  }

  const handleIconBtn = (event) => {
    event.stopPropagation()
    const { currentTarget } = event
    setAnchorEl(currentTarget)
  }

  return (
    <>
      <Tooltip title="Options" placement="left">
        <IconButton onClick={handleIconBtn}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{ sx: { paddingY: 0, minWidth: '160px' } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setAnchorEl(null)}
        onClick={event => event.stopPropagation()}>
        { actions.map(({ onClick, ...item }) => <MenuItem {...item} onClick={() => handleItemClick(onClick)} key={item.text} />) }
      </Menu>
    </>
  )
}
