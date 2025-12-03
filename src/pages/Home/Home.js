import { Box, Grid, Grow, Typography } from "@mui/material";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Home() {
  const incenses = ['images/Incense1.jpg', 'images/Incense2.jpg'];
  const spices = ['images/Spices1.jpg', 'images/Spices2.jpg'];
  const timeout = 1000;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid size={{ lg: 7, sm: 6, xs: 12 }}>
          <Box sx={{ p: 1 }}>
            <AppCarousel list={incenses} height="400px" timeout={timeout} link="incense" t1="Experience the" t2="Divine Fragrance" t4="Handcrafted incense sticks and authentic Indian masala powders made with traditional methods and premium natural ingredients by SHIKRITI GROUP." />
          </Box>
        </Grid>
        <Grid size={{ lg: 5, sm: 6, xs: 12 }}>
          <Box sx={{ p: 1, pl: { md: 0, xs: 1 } }} xs={{ p: 1 }}>
            <AppCarousel list={spices} height="300px" timeout={timeout} link="spices" t3="100% Natural & Pure by SHIKRITI GROUP" />
          </Box>
          <Box sx={{ p: { md: 0, xs: 1 }, pr: 1 }} sm={{ p: 1 }}>
            <Grow
              in={true}
              style={{ transformOrigin: '0 0 0', timeout: timeout }}
            >
              <Box className="explore-container">
                <img src="/images/b2b.jpg" height="92px" width="100%" />
                <ButtonExplore link="b2b" text="Contact Us" type="secondary" />
              </Box>
            </Grow>
          </Box>
        </Grid>
      </Grid>
    </Box >
  )
}

function AppCarousel({ list, height, timeout, link, t1 = '', t2 = '', t3 = '', t4 = '' }) {
  return (
    <Grow
      in={true}
      style={{ transformOrigin: '0 0 0', timeout: timeout }}
    >
      <Box className="explore-container">
        <Carousel showArrows={false} autoPlay={true} showThumbs={false} infiniteLoop={true} showStatus={false}>
          {list.map((item, index) => <img key={'carousel_item_' + index} src={item} height={height} />)}
        </Carousel>
        <ButtonExplore link={link} text="Explore Products" />
        <Box className="details-texts">
          <Typography variant="h3">{t1}</Typography>
          <Typography variant="h3">{t2}</Typography>
          <Typography variant="h4">{t3}</Typography>
          <Typography variant="h6">{t4}</Typography>
        </Box>
      </Box>
    </Grow>
  )
}

function ButtonExplore({ link, text, type }) {
  return (<Link to={link} className={'btn-explore btn-explore-' + (type ?? 'primary')}>
    {text}
    <ArrowForwardIcon sx={{ pl: 1 }} />
  </Link>)
}
