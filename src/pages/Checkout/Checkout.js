import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCart } from "../../helper/OrderHelper";
import { API, ROUTE_PATH } from "../../helper/Constants";
import axios from "axios";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { displayNo } from "../../helper/Number";

export default function Checkout() {
  const [t] = useTranslation();
  const lan = localStorage.getItem("userLanguage");
  const userAddress = JSON.parse(localStorage.getItem("userAddress"));

  const navigate = useNavigate();

  const [myOrder, ] = useState(getCart());
  const [incenses, setIncenses] = useState([]);
  const [spices, setSpices] = useState([]);

  const handleSubmit = () => {
    navigate("/" + ROUTE_PATH.CHECKOUT);
  };

  useEffect(() => {
    loadLookups();
  }, []);

  const loadLookups = async () => {
    const incensesRes = await axios.get(API.BASE + API.INCENSES);
    const spicesRes = await axios.get(API.BASE + API.SPICES);

    setIncenses(incensesRes.data);
    setSpices(spicesRes.data);
  };

  return (
    <Box sx={{ padding: "15px", textAlign: "left" }}>
      {myOrder?.items?.length > 0 && incenses?.length > 0 && spices?.length > 0 ? (
        <Box>
          <Typography variant="h5" sx={{ padding: "10px 0" }}>
            {t("cart.total")}: ₹ {displayNo(myOrder.items.reduce((a,v) =>  a = a + (v.offerPrice * v.count) , 0 ).toFixed(2))}
          </Typography>
          <Box sx={{ padding: "10px" }}>
            <Grid container>
              <Grid
                size={{ md: 4, xs: 12 }}
                sx={{ padding: "10px 20px", border: "1px solid #80787869" }}
              >
                <Box>
                  <b>{t("b2b.fullname")} :</b>
                  {userAddress.n}
                </Box>
                <Box>
                  <b>{t("b2b.phone")} :</b>
                  {userAddress.pn}
                </Box>
                <Box>
                  <b>{t("b2b.email")} :</b>
                  {userAddress.e}
                </Box>
                <Box>
                  <b>{t("b2b.address")} :</b>
                  {userAddress.a}
                </Box>
                <Box>
                  <b>{t("b2b.pin")} :</b>
                  {userAddress.p}
                </Box>
                <Button variant="contained" onClick={handleSubmit}>
                  {t("cart.checkout")}
                </Button>
              </Grid>
              <Grid
                size={{ md: 8, xs: 12 }}
                sx={{ padding: "10px 20px", border: "1px solid #80787869" }}
              >
                {myOrder.items
                  ?.sort((a, b) => a.order - b.order)
                  .map((item, index) => {
                    let product =
                      item.type === ROUTE_PATH.INCENSES
                        ? incenses.filter(
                            (incense) => incense.id === item.id
                          )[0]
                        : spices.filter((spice) => spice.id === item.id)[0];

                    return (
                      <Grid container key={"cart_item_" + index}>
                        <Grid
                          size={{ md: 12, xs: 12 }}
                          container
                          sx={{
                            padding: "2px",
                            borderBottom: 1,
                            borderColor: "#9494943d",
                            marginBottom: "10px",
                          }}
                        >
                          <Grid
                            size={{ md: 2, xs: 4 }}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignSelf: "center",
                            }}
                          >
                            <Link
                              to={
                                "/" +
                                ROUTE_PATH.PRODUCT_DETAILS +
                                "/" +
                                product.id +
                                "/" +
                                item.type
                              }
                              style={{ textAlign: "center" }}
                            >
                              <img
                                src={product.thumbnail}
                                alt={product.thumbnail}
                                className="checkout-img"
                              ></img>
                            </Link>
                          </Grid>
                          <Grid size={{ md: 10, xs: 8 }} container>
                            <Grid
                              size={{ lg: 6 }}
                              sx={{ padding: "5px", alignSelf: "center" }}
                            >
                              {product.name.find((n) => n.key === lan).value}
                            </Grid>
                            <Grid
                              size={{ lg: 4 }}
                              sx={{ padding: "5px", alignSelf: "center" }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  fontWeight: "bold",
                                  padding: "0 3px",
                                  fontSize: "15px",
                                }}
                              >
                                ₹
                                {displayNo(
                                  Number(
                                    product.price.offerPrice * item.count
                                  ).toFixed(2)
                                )}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  textDecoration: "line-through",
                                  color: "#888888ff",
                                }}
                              >
                                ₹
                                {displayNo(
                                  Number(
                                    product.price.actualPrice * item.count
                                  ).toFixed(2)
                                )}
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
                            </Grid>
                            <Grid
                              size={{ lg: 2 }}
                              sx={{
                                padding: "5px",
                                alignSelf: "center",
                                display: "flex",
                                justifySelf: "center",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                sx={{ textAlign: "center", minWidth: "35px" }}
                              >
                                {displayNo(item.count.toString())}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box sx={{ minHeight: "200px", display: "flex" }}>
          <Box sx={{ margin: "auto" }}>{t("cart.no-order-found")}</Box>
        </Box>
      )}
    </Box>
  );
}
