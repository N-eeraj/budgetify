// material ui imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

// component imports
import OptionsMenu from '@components/UI/OptionsMenu'

export default function ActionCard({ title, actions, cardProps, children }) {
  return (
    <Card
      {...cardProps}
      sx={{ 
        maxWidth: '420px',
        ...cardProps.sx,
      }}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: 'h5',
          component: 'h2',
        }}
        action={ !!actions?.length && <OptionsMenu actions={actions} /> }/>
      <CardContent sx={{ paddingY: 0 }}>
        { children }
      </CardContent>
    </Card>
  )
}
