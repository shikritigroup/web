import { Box, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import "./Footer.css"

export default function Footer() {
  return (
    <Box sx={{ p: 1, paddingTop: "100px" }}>
      <Box sx={{ borderTop: 1, borderColor: '#c0c0c0ff', pt: 2, textAlign: 'left' }}>
        <Grid container>
          <Grid size={{ md: 6, xs: 12 }}>
            <ul>
              <li>Organic, Non-Synthetic and Eco-friendly</li>
              <li>Purify the air, updivft the Prayers</li>
              <li>Designed for calm, chosen for Yoga</li>
              <li>Exclusive long-lasting natural aroma that soothes your mind</li>
              <li>We are part of your Yoga class, Aroma therapy</li>
              <li>Focusing on female empowerment</li>
              <li>Target is to reach EVERY household with LOW price and HIGH quadivty</li>
              <li>Offering HIGH margin to our partners</li>
              <li>Providing after sales support and customization options</li>
            </ul>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Box>Copyright © 2025 Shikriti Group Pvd. Ltd. All Rights Reserved.</Box>
              <Box><Link to='/web/Contact'>Contact Us.</Link> & <Link to='/web/Terms'>Terms and Condition.</Link></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
