// material ui imports
import { Card, CardContent, CardHeader } from '@mui/material'

// component imports
import OptionsMenu from '@components/UI/OptionsMenu'

export default function ActionCard({ title, actions, cardProps, children }) {
  return (
    <Card {...cardProps}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: 'h5',
          component: 'h2',
        }}
        action={ <OptionsMenu actions={actions} /> }/>
      <CardContent sx={{ paddingY: 0 }}>
        { children }
      </CardContent>
    </Card>
  )
}
