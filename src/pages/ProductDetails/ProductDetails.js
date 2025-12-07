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
  }, [id, type])

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
        <Box sx={{ padding: '25px' }}>
          <Grid container>
            <Grid size={{ md: 6, xs: 12 }}>
              <AppCarousel name="ProductDetails" list={product?.images}></AppCarousel>
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <Box sx={{ textAlign: "left", padding: "0 25px" }}>
                <Typography sx={{ fontSize: "25px" }}>
                  {product?.name}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>100% Natural & Pure by SHIKRITI GROUP</Typography>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: "bold", padding: '0 3px', fontSize: "25px" }}>
                    ₹{Number(product.price.offerPrice).toFixed(2)}
                  </Typography>
                  <Typography variant="caption" sx={{ textDecoration: "line-through", color: '#888888ff' }} >
                    ₹{Number(product.price.actualPrice).toFixed(2)}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: "bold", padding: '0 3px', color: '#28d311ff' }} >
                    {product.price.offer} off
                  </Typography>
                </Box>
                <Typography>
                  {product?.description}
                </Typography>
                <ul>
                  {product?.details.split('\n ').map((del) => <li>{del}</li>)}
                </ul>
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
