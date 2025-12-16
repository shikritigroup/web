import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./MostSales.css";
import ProductCard from "../ProductCard/ProductCard";
import { useTranslation } from "react-i18next";

export default function MostSales({ headerText, items, moreLink, type }) {
  const [t] = useTranslation();
  const theme = useTheme();
  const itemToDisplay = useMediaQuery(theme.breakpoints.up("lg")) ? 6 : 4;

  return (
    items && (
      <Box padding="5px">
        <Box textAlign="left" alignItems="flex-start" margin="0">
          <Typography variant="h5" margin="0">
            {headerText}
          </Typography>
          <Box
            textAlign="left"
            alignItems="flex-start"
            margin="0"
            bgcolor="#fff"
            padding="5px"
          >
            <Grid container spacing={1}>
              <Grid size={{ lg: 11, sm: 11, xs: 12 }} container>
                {items?.length > 0 &&
                  items
                    .slice(0, itemToDisplay)
                    .map((item, index) => (
                      <ProductCard
                        key={"best-product" + index}
                        item={item}
                        type={type}
                      ></ProductCard>
                    ))}
              </Grid>
              <Grid size={{ lg: 1, sm: 1, xs: 12 }} style={{ display: "flex" }}>
                <Link to={moreLink} className="btn-more">
                  {t("more")}
                  <ArrowForwardIcon sx={{ pl: 1 }} />
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    )
  );
}
