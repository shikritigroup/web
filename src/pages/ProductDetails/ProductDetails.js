import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppCarousel from "../../components/AppCarousel/AppCarousel";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductDetails() {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const { type } = useParams();

  useEffect(() => {
    if (id && type) {
      loadLookups(id, type);
    }
  }, [])

  const loadLookups = async (id, type) => {
    const res = await axios.get(`/web/lookups/${type}.json`);
    const products = res?.data?.filter((p) => p.id === id);
    if (products && products[0]) {
      setProduct(products[0]);
    }
  }

  return (
    <>
      {product &&
        <Box sx={{ padding: '10px' }}>
          <Grid container>
            <Grid size={{ md: 6, xs: 12 }}>
              <AppCarousel name="ProductDetails" list={product?.images}></AppCarousel>
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <Box sx={{ textAlign: "left", padding: "5px" }}>
                <Typography>
                  Name:  {product?.name}
                </Typography>
                <Typography>
                  Description:  {product?.description}
                </Typography>
                <Typography>
                  Product details:  {product?.details}
                </Typography>
                <Box>
                  Price:
                  <Typography variant="caption" sx={{ textDecoration: "line-through", fontWeight: "bold", padding: '0 5px' }} >
                    ₹{Number(product?.price.actualPrice).toFixed(2)}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                    ₹{Number(product?.price.offerPrice).toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ padding: "5px 0" }}>
                  <AddShoppingCartIcon></AddShoppingCartIcon>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      }
      {
        !product &&
        <Box sx={{ padding: '10px' }}>
          Product Not Found
        </Box>
      }
    </>
  )
}
