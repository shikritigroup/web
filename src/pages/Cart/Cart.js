import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addToCart, getCart, removeFromCart } from "../../helper/OrderHelper";
import { API, ROUTE_PATH } from "../../helper/Constants";
import axios from "axios";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { displayNo } from "../../helper/Number";

export default function Cart() {
  const [t] = useTranslation();
  const lan = localStorage.getItem("userLanguage");
  const userAddress = JSON.parse(localStorage.getItem("userAddress"));

  const navigate = useNavigate();

  const [myOrder, setMyOrder] = useState(getCart());
  const [incenses, setIncenses] = useState([]);
  const [spices, setSpices] = useState([]);
  const [contacts, setContacts] = useState();

  const [fullName, setFullName] = useState(userAddress?.n);
  const [phoneNumber, setPhoneNumber] = useState(userAddress?.pn);
  const [email, setEmail] = useState(userAddress?.e);
  const [address, setAddress] = useState(userAddress?.a);
  const [pin, setPin] = useState(userAddress?.p);

  const handleSubmit = () => {
    localStorage.setItem(
      "userAddress",
      JSON.stringify({
        n: fullName,
        pn: phoneNumber,
        e: email,
        a: address,
        p: pin,
      })
    );
    navigate("/" + ROUTE_PATH.CHECKOUT);
  };

  useEffect(() => {
    loadLookups();
  }, []);

  const loadLookups = async () => {
    const incensesRes = await axios.get(API.BASE + API.INCENSES);
    const spicesRes = await axios.get(API.BASE + API.SPICES);
    const resContact = await axios.get(API.BASE + API.CONTACTS);

    setIncenses(incensesRes.data);
    setSpices(spicesRes.data);
    setContacts(resContact?.data);
  };

  const increaseQuantity = (id, type) => {
    addToCart(id, type, contacts.deliveryFee);
    setMyOrder(getCart());
  };

  const decreaseQuantity = (id, type) => {
    removeFromCart(id, type, contacts.deliveryFee);
    setMyOrder(getCart());
  };

  return (
    <Box sx={{ padding: "15px", textAlign: "left" }}>
      <Typography
        variant="h4"
        sx={{
          borderBottom: 1,
          textAlign: "center",
          padding: "10px 0",
          borderColor: "#abababcc",
        }}
      >
        {t("cart.header")}
      </Typography>
      {myOrder?.items?.length > 0 &&
      incenses?.length > 0 &&
      spices?.length > 0 ? (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h5"
              sx={{ padding: "10px 20px 10px 0", fontWeight: "bold" }}
            >
              {t("cart.total")}: ₹{" "}
              {displayNo(
                (
                  myOrder.items.reduce(
                    (a, v) => (a = a + v.offerPrice * v.count),
                    0
                  ) + myOrder.deliveryFee
                ).toFixed(2)
              )}
            </Typography>
            <Typography variant="span" sx={{ padding: "10px 20px 10px 0" }}>
              {t("cart.delivery-fee")}: ₹{" "}
              {displayNo(myOrder?.deliveryFee?.toFixed(2))}
            </Typography>
            <Typography variant="span" sx={{ padding: "10px 20px 10px 0" }}>
              {t("cart.item-total")}: ₹{" "}
              {displayNo(
                myOrder.items
                  .reduce((a, v) => (a = a + v.offerPrice * v.count), 0)
                  .toFixed(2)
              )}
            </Typography>
          </Box>
          <Box sx={{ padding: "10px" }}>
            <Grid container>
              <Grid
                size={{ md: 4, xs: 12 }}
                sx={{ padding: "10px 20px", border: "1px solid #80787869" }}
              >
                <FormGroup>
                  <FormControl sx={{ display: "block", paddingBottom: "15px" }}>
                    <InputLabel htmlFor="name">
                      {t("b2b.fullname")} *
                    </InputLabel>
                    <Input
                      required
                      id="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </FormControl>
                  <FormControl sx={{ display: "block", paddingBottom: "15px" }}>
                    <InputLabel htmlFor="phone">{t("b2b.phone")} *</InputLabel>
                    <Input
                      required
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </FormControl>
                  <FormControl sx={{ display: "block", paddingBottom: "15px" }}>
                    <InputLabel htmlFor="email">{t("b2b.email")} *</InputLabel>
                    <Input
                      required
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </FormControl>
                  <FormControl sx={{ display: "block", paddingBottom: "15px" }}>
                    <InputLabel htmlFor="address">
                      {t("b2b.address")} *
                    </InputLabel>
                    <Input
                      required
                      id="address"
                      value={address}
                      sx={{ width: "100%" }}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormControl>
                  <FormControl sx={{ display: "block", paddingBottom: "15px" }}>
                    <InputLabel htmlFor="pin">{t("b2b.pin")} *</InputLabel>
                    <Input
                      required
                      id="pin"
                      value={pin}
                      sx={{ width: "100%" }}
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    disabled={!fullName || !phoneNumber || !email || !pin}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    {t("cart.checkout")}
                  </Button>
                </FormGroup>
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
                                className="cart-img"
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
                              <Button
                                sx={{
                                  border: 1,
                                  padding: "5px",
                                  minWidth: "35px",
                                  fontWeight: "bold",
                                }}
                                onClick={() =>
                                  decreaseQuantity(product.id, item.type)
                                }
                              >
                                -
                              </Button>
                              <Typography
                                sx={{ textAlign: "center", minWidth: "35px" }}
                              >
                                {displayNo(item.count.toString())}
                              </Typography>
                              <Button
                                sx={{
                                  border: 1,
                                  padding: "5px",
                                  minWidth: "35px",
                                  fontWeight: "bold",
                                }}
                                onClick={() =>
                                  increaseQuantity(product.id, item.type)
                                }
                              >
                                +
                              </Button>
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
