import { Box, Grid, Grow } from "@mui/material";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MostSales from "../../components/MostSales/MostSales";
import AppCarousel from "../../components/AppCarousel/AppCarousel";
import { API, ROUTE_PATH } from "../../helper/Constants";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [t] = useTranslation();
  const [lookups, setLookups] = useState({});
  const [bestSaleIncenses, setBestSaleIncenses] = useState([]);
  const [bestSaleSpices, setBestSaleSpices] = useState([]);

  useEffect(() => {
    loadLookups();
  }, []);

  const loadLookups = async () => {
    const lookupPromise = axios.get(API.BASE + API.HOME_LOOKUPS);
    const incensesPromise = axios.get(API.BASE + API.INCENSES);
    const spicesPromise = axios.get(API.BASE + API.SPICES);

    Promise.all([lookupPromise, incensesPromise, spicesPromise]).then((res) => {
      setLookups(res[0].data);
      setBestSaleIncenses(res[1].data.sort((a, b) => b.sale - a.sale));
      setBestSaleSpices(res[2].data.sort((a, b) => b.sale - a.sale));
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid size={{ lg: 7, sm: 6, xs: 12 }}>
          <Box sx={{ p: 1 }}>
            <AppCarousel
              name="incenses"
              list={lookups?.incenses}
              className="car-img-1"
              link={ROUTE_PATH.INCENSES}
              exploretype="secondary"
              btnText={t("home.carousel.explore.incenses.btn.text")}
              t1={t("home.carousel.incenses.t1")}
              t2={t("home.carousel.incenses.t2")}
              t4={t("home.carousel.incenses.t4")}
            />
          </Box>
        </Grid>
        <Grid size={{ lg: 5, sm: 6, xs: 12 }}>
          <Box sx={{ p: 1, pl: { md: 0, xs: 1 } }} xs={{ p: 1 }}>
            <AppCarousel
              name="spices"
              list={lookups?.spices}
              className="car-img-2"
              btnText={t("home.carousel.explore.spices.btn.text")}
              link={ROUTE_PATH.SPICES}
              t3={t("home.carousel.spices.t3")}
              exploretype="secondary"
            />
          </Box>
          <Box sx={{ p: { md: 0, xs: 1 }, pr: 1 }} sm={{ p: 1 }}>
            <Grow in={true} style={{ transformOrigin: "0 0 0", timeout: 1000 }}>
              <Box className="explore-container" sx={{ pr: 1 }}>
                <AppCarousel
                  name="b2b"
                  list={lookups?.b2bs}
                  className="car-img-3"
                  link={ROUTE_PATH.B2B}
                  exploretype="secondary"
                  btnText={t("home.carousel.explore.b2b.btn.text")}
                />
              </Box>
            </Grow>
          </Box>
        </Grid>
      </Grid>
      <MostSales
        headerText={t("home.best.sale.incenses.header")}
        items={bestSaleIncenses}
        moreLink={ROUTE_PATH.INCENSES}
        type={ROUTE_PATH.INCENSES}
      ></MostSales>
      <MostSales
        headerText={t("home.best.sale.spices.header")}
        items={bestSaleSpices}
        moreLink={ROUTE_PATH.SPICES}
        type={ROUTE_PATH.SPICES}
      ></MostSales>
    </Box>
  );
}
