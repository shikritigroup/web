import { Box, Grid, Grow } from "@mui/material";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MostSales from "../../components/MostSales/MostSales";
import AppCarousel from "../../components/AppCarousel/AppCarousel";
import { API, ROUTE_PATH } from "../../helper/Constants";

export default function Home() {
  const [lookups, setLookups] = useState({});

  useEffect(() => {
    loadLookups();
  }, [])

  const loadLookups = async () => {
    const res = await axios.get(API.BASE + API.HOME_LOOKUPS);
    setLookups(res.data);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid size={{ lg: 7, sm: 6, xs: 12 }}>
          <Box sx={{ p: 1 }}>
            <AppCarousel name="incenses" list={lookups?.incenses} className="car-img-1" link={ROUTE_PATH.INCENSES} exploretype="secondary"
              btnText="Explore Products"
              t1="Experience the" t2="Divine Fragrance" t4="Handcrafted incense sticks and authentic Indian masala powders made with traditional methods and premium natural ingredients by SHIKRITI GROUP." />
          </Box>
        </Grid>
        <Grid size={{ lg: 5, sm: 6, xs: 12 }}>
          <Box sx={{ p: 1, pl: { md: 0, xs: 1 } }} xs={{ p: 1 }}>
            <AppCarousel name="spices" list={lookups?.spices} className="car-img-2" btnText="Explore Products" link={ROUTE_PATH.SPICES}
              t3="100% Natural & Pure by SHIKRITI GROUP" exploretype="secondary" />
          </Box>
          <Box sx={{ p: { md: 0, xs: 1 }, pr: 1 }} sm={{ p: 1 }}>
            <Grow
              in={true}
              style={{ transformOrigin: '0 0 0', timeout: 1000 }}
            >
              <Box className="explore-container" sx={{ pr: 1 }}>
                <AppCarousel name="b2b" list={lookups?.b2bs} className="car-img-3" link={ROUTE_PATH.B2B} exploretype="secondary" btnText="Explore" />
              </Box>
            </Grow>
          </Box>
        </Grid>
      </Grid>
      <MostSales headerText="Last Month Best Sales Incenses" items={lookups?.bestSaleIncenses} moreLink={ROUTE_PATH.INCENSES} type={ROUTE_PATH.INCENSES}></MostSales>
      <MostSales headerText="Last Month Best Sales Spices" items={lookups?.bestSaleSpices} moreLink={ROUTE_PATH.SPICES} type={ROUTE_PATH.SPICES}></MostSales>
    </Box >
  )
}


