// material ui imports
import { Grid } from '@mui/material'

export default function DashboardGrid({ items, Component, ...actions }) {
  return (
    <Grid container spacing={2} paddingTop={2}>
      { items.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Component {...item} {...actions}  />
          </Grid>
        )) }
    </Grid>
  )
}
