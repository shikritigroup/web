import { Box, Grid, Grow, Typography } from "@mui/material";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from "react";
import axios from "axios";
import MostSales from "../../components/MostSales/MostSales";
import { Image } from "@mui/icons-material";

export default function Home() {
  const [lookups, setLookups] = useState()

  useEffect(() => {
    loadLookups();
  }, [])

  const loadLookups = async () => {
    const res = await axios.get('/web/lookups/home-lookups.json');
    setLookups(res.data);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid size={{ lg: 7, sm: 6, xs: 12 }}>
          <Box sx={{ p: 1 }}>
            <AppCarousel name="incenses" list={lookups?.incenses} className="car-img-1" link="incense" exploretype="secondary" 
            btnText="Explore Products"
              t1="Experience the" t2="Divine Fragrance" t4="Handcrafted incense sticks and authentic Indian masala powders made with traditional methods and premium natural ingredients by SHIKRITI GROUP." />
          </Box>
        </Grid>
        <Grid size={{ lg: 5, sm: 6, xs: 12 }}>
          <Box sx={{ p: 1, pl: { md: 0, xs: 1 } }} xs={{ p: 1 }}>
            <AppCarousel name="spices" list={lookups?.spices} className="car-img-2" btnText="Explore Products" link="spices"
              t3="100% Natural & Pure by SHIKRITI GROUP" exploretype="secondary" />
          </Box>
          <Box sx={{ p: { md: 0, xs: 1 }, pr: 1 }} sm={{ p: 1 }}>
            <Grow
              in={true}
              style={{ transformOrigin: '0 0 0', timeout: 1000 }}
            >
              <Box className="explore-container">
                <AppCarousel name="b2b" list={lookups?.b2bs} className="car-img-3" link="b2b" exploretype="secondary" btnText="Explore"/>
              </Box>
            </Grow>
          </Box>
        </Grid>
      </Grid>
      <MostSales headerText="Last Month Best Sales Incenses" items={lookups?.bestSaleIncenses}></MostSales>
      {/* <MostSales headerText="Last Month Best Sales Spices" items={lookups.bestSaleSpices}></MostSales> */}
    </Box >
  )
}

function AppCarousel({ name, list, className, link, exploretype, btnText, t1 = '', t2 = '', t3 = '', t4 = '' }) {
  return (
    list?.length > 0 &&
    <Grow
      in={true}
      style={{ transformOrigin: '0 0 0', timeout: 1000 }}
    >
      <Box className="explore-container">
        <Carousel showArrows={false} autoPlay={true} showThumbs={false} infiniteLoop={true} showStatus={false}>
          {list.map((item, index) => <img alt={item} key={'carousel_item_' + name + '_' + index} src={item} className={className} />)}
        </Carousel>
        <ButtonExplore link={link} text={btnText} type={exploretype} />
        <Box className="details-texts">
          <Typography variant="h3">{t1}</Typography>
          <Typography variant="h4">{t2}</Typography>
          <Typography variant="h5">{t3}</Typography>
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
