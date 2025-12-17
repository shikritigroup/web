import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppCarousel from "../../components/AppCarousel/AppCarousel";
import { API, ROUTE_PATH } from "../../helper/Constants";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../../helper/OrderHelper";
import { useTranslation } from "react-i18next";
import { displayNo } from "../../helper/number";

export default function ProductDetails() {
  const [t] = useTranslation();
  const [product, setProduct] = useState();
  const { id } = useParams();
  const { type } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (id && type) {
      loadLookups(id, type);
    }
  }, [id, type]);

  const loadLookups = async (id, type) => {
    const res = await axios.get(
      API.BASE + (type === ROUTE_PATH.INCENSES ? API.INCENSES : API.SPICES)
    );
    const products = res?.data?.filter((p) => p.id === id);
    if (products && products[0]) {
      setProduct(products[0]);
    }
  };

  const handelAddToCart = () => {
    addToCart(id, type);
    navigator("/" + ROUTE_PATH.CART);
  };

  return (
    <>
      {product && (
        <Box sx={{ padding: "25px" }}>
          <Grid container>
            <Grid size={{ lg: 4, md: 6, xs: 12 }}>
              <AppCarousel
                name="ProductDetails"
                list={product?.images}
                className={"product-details-img"}
              ></AppCarousel>
            </Grid>
            <Grid size={{ lg: 8, md: 6, xs: 12 }}>
              <Box sx={{ textAlign: "left", padding: "0 25px" }}>
                <Typography sx={{ fontSize: "25px" }}>
                  {product?.name}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  100% Natural & Pure by SHIKRITI GROUP
                </Typography>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "bold",
                      padding: "0 3px",
                      fontSize: "25px",
                    }}
                  >
                    ₹{displayNo(Number(product.price.offerPrice).toFixed(2))}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ textDecoration: "line-through", color: "#888888ff" }}
                  >
                    ₹{displayNo(Number(product.price.actualPrice).toFixed(2))}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "bold",
                      padding: "0 3px",
                      color: "#28d311ff",
                    }}
                  >
                    {displayNo(product.price.offer)}
                    {t("off")}
                  </Typography>
                </Box>
                <Typography>{product?.description}</Typography>
                <ul>
                  {product?.details.split("\n ").map((del, index) => (
                    <li key={"del_" + index}>{del}</li>
                  ))}
                </ul>
                <Button variant="contained" onClick={handelAddToCart}>
                  <ShoppingCartIcon />
                  <Typography>{t("product.detail.addtocart")}</Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {!product && <Box sx={{ padding: "10px" }}>Product Not Found</Box>}
    </>
  );
}
