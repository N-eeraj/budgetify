// material ui imports
import { Dialog, Card, CardHeader, CardActions, Button, IconButton, CardContent, Grid, Badge } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

// component imports
import ProfileAvatar from '@components/Dashboard/Profile/Avatar'

// hooks imports
import useProfilePicture from '@hooks/useProfilePicture'

export default function ProfilePicture() {
  const {
    open, setOpen,
    image,
    profileImages,
    changeProfilePicture
  } = useProfilePicture()

  return (
    <>
      <ProfileAvatar
        sx={{
          width: 'min(80vw, 120px)',
          height: 'min(80vw, 120px)',
        }}
        onClick={() => setOpen(true)} />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Card sx={{ maxWidth: '420px' }}>
          <CardHeader
            title="Profile Picture"
            action={
            <IconButton onClick={() => setOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
            }/>

          <CardContent sx={{ paddingY: 0 }}>
            <Grid container spacing={2}>
              { profileImages.map((src, index) => (
                <Grid item xs={3} key={index}>
                  <Badge
                    invisible={image !== index}
                    overlap="circular"
                    badgeContent={
                    <CheckCircleIcon
                      color="primary"
                      sx={{
                        backgroundColor: ({ palette }) => palette.background.default,
                        borderRadius: '50%',
                      }} />
                    }
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}>
                    <IconButton
                      sx={{
                        width: '100%',
                        padding: 0,
                      }}
                      onClick={() => changeProfilePicture(index)}>
                      <img src={src} width="100%" />
                    </IconButton>
                  </Badge>
                </Grid>
              )) }
            </Grid>
          </CardContent>

          <CardActions sx={{ padding: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              color="error"
              onClick={() => changeProfilePicture(null)}>
              Remove Picture
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </>
  )
}
