import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addToCart, getCart, removeFromCart } from "../../helper/OrderHelper";
import { API, ROUTE_PATH } from "../../helper/Constants";
import axios from "axios";
import "./Cart.css";
import { Link } from "react-router-dom";

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

  const increaseQuantity = (id, type) => {
    addToCart(id, type);
    setMyOrder(getCart());
  }

  const decreaseQuantity = (id, type) => {
    removeFromCart(id, type);
    setMyOrder(getCart());
  }

  return (
    <Box sx={{ padding: "15px", textAlign: "left" }}>
      <Typography variant="h4" sx={{ borderBottom: 1, textAlign: "center", padding: "10px 0" }}>
        My Cart
      </Typography>
      {
        myOrder.orderNumber && incenses?.length > 0 && spices?.length > 0 ? <Box>
          <Typography variant="h5" sx={{ padding: "10px 0" }}>
            Order No: {myOrder.orderNumber}
          </Typography>
          <Box sx={{ padding: "10px" }}>
            {
              myOrder.items?.sort((a, b) => a.order - b.order).map((item, index) => {
                let product = item.type === ROUTE_PATH.INCENSES ? incenses.filter((incense) => incense.id === item.id)[0]
                  : spices.filter((spice) => spice.id === item.id)[0];

                return <Grid container key={"cart_item_" + index}>
                  <Grid size={{ md: 7, xs: 12 }} container sx={{ padding: "2px", borderBottom: 1, borderColor: "#3333337c", marginBottom: "10px" }}>
                    <Grid size={{ md: 3, xs: 12 }} sx={{ display: "flex", alignSelf: "center" }}>
                      <Link to={"/" + ROUTE_PATH.PRODUCT_DETAILS + "/" + product.id + "/" + item.type} style={{ textAlign: "center" }}>
                        <img src={product.thumbnail} alt={product.thumbnail} className="cart-img"></img>
                      </Link>
                    </Grid>
                    <Grid size={{ md: 9, sm: 6 }} container>
                      <Grid size={{ lg: 6 }} sx={{ padding: "5px", alignSelf: "center" }}>{product.name}</Grid>
                      <Grid size={{ lg: 4 }} sx={{ padding: "5px", alignSelf: "center" }}>
                        <Typography variant="caption" sx={{ fontWeight: "bold", padding: '0 3px', fontSize: "15px" }}>
                          ₹{Number(product.price.offerPrice).toFixed(2)}
                        </Typography>
                        <Typography variant="caption" sx={{ textDecoration: "line-through", color: '#888888ff' }} >
                          ₹{Number(product.price.actualPrice).toFixed(2)}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: "bold", padding: '0 3px', color: '#28d311ff' }} >
                          {product.price.offer} off
                        </Typography></Grid>
                      <Grid size={{ lg: 2 }} sx={{ padding: "5px", alignSelf: "center", display: "flex", justifySelf: "center", alignItems: "center" }}>
                        <Button sx={{ border: 1, padding: "5px", minWidth: "35px", fontWeight: "bold" }} onClick={() => decreaseQuantity(product.id, item.type)}>-</Button>
                        <Typography sx={{ textAlign: "center", minWidth: "35px" }}>{item.count}</Typography>
                        <Button sx={{ border: 1, padding: "5px", minWidth: "35px", fontWeight: "bold" }} onClick={() => increaseQuantity(product.id, item.type)}>+</Button>
                      </Grid>
                    </Grid>
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
