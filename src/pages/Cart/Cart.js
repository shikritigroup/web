import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCart } from "../../helper/OrderHelper";
import { API, ROUTE_PATH } from "../../helper/Constants";
import axios from "axios";

export default function Cart() {
  const [myOrder, setMyOrder] = useState(getCart());
  const [incenses, setIncenses] = useState([]);
  const [spices, setSpices] = useState([]);

  useEffect(() => {
    loadLookups();
  }, [])

  const loadLookups = async () => {
    const incensesRes = await axios.get(API.BASE + API.INCENSES);
    const spicesRes = await axios.get(API.BASE + API.SPICES);

    setIncenses(incensesRes.data);
    setSpices(spicesRes.data);
  }


  return (
    <Box sx={{ padding: "15px", textAlign: "left" }}>
      <Typography variant="h4">
        My Cart
      </Typography>
      {
        myOrder.orderNumber && incenses?.length > 0 && spices?.length > 0 ? <Box>
          <Typography variant="h5">
            Order No: {myOrder.orderNumber}
          </Typography>
          <Box>
            {
              myOrder.items?.map((item) => {
                let product = item.type === ROUTE_PATH.INCENSES ? incenses.filter((incense) => incense.id === item.id)[0]
                  : spices.filter((spice) => spice.id === item.id)[0];

                return <Grid container>
                  <Grid size={{ lg: 3 }}>
                    <img src={product.thumbnail} alt={product.thumbnail} height="50px"></img>
                  </Grid>
                  <Grid size={{ lg: 3 }}>{product.name}</Grid>
                  <Grid size={{ lg: 3 }}>Price:
                    <Typography variant="caption" sx={{ fontWeight: "bold", padding: '0 3px', fontSize: "25px" }}>
                      ₹{Number(product.price.offerPrice).toFixed(2)}
                    </Typography>
                    <Typography variant="caption" sx={{ textDecoration: "line-through", color: '#888888ff' }} >
                      ₹{Number(product.price.actualPrice).toFixed(2)}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: "bold", padding: '0 3px', color: '#28d311ff' }} >
                      {product.price.offer} off
                    </Typography></Grid>
                  <Grid size={{ lg: 3 }}>
                    {
                      item.count
                    }
                  </Grid>
                </Grid>;
              })
            }
          </Box>
        </Box> : <Box>
          No Order Found.
        </Box>
      }
    </Box>
  )
}
