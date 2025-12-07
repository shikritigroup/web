import { Box, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import "./Footer.css"

export default function Footer() {
  return (
    <Box sx={{ p: 1, paddingTop: "50px" }}>
      <Box sx={{ borderTop: 1, borderColor: '#c0c0c0ff', pt: 2, textAlign: 'left' }}>
        <Grid container>
          <Grid size={{ md: 6, xs: 12 }}>
            <Box sx={{ lg: { textAlign: 'left' }, sm: { textAlign: 'center'} }}>
              <Box>100% Natural & Pure by SHIKRITI GROUP</Box>
            </Box>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <Box sx={{ lg: { textAlign: 'right' }, sm: { textAlign: 'center'} }}>
              <Box>Copyright © 2025 Shikriti Group Pvd. Ltd. All Rights Reserved.</Box>
              <Box><Link to='/web/Contact'>Contact Us.</Link> & <Link to='/web/Terms'>Terms and Condition.</Link></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
