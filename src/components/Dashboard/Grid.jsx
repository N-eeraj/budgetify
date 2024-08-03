// material ui imports
import { Grid } from '@mui/material'

export default function DashboardGrid({ items, Component, emptyState, ...actions }) {
  return (
    items?.length ?
      <Grid container rowSpacing={2} columnSpacing={3} paddingTop={3}>
        { items.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Component {...item} {...actions}  />
            </Grid>
          ))
        }
      </Grid> :
      emptyState
  )
}
