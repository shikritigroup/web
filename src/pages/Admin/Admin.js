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
import "./Admin.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { displayNo } from "../../helper/Number";
import AddOrder from "./AddOrder/AddOrder";

export default function Admin() {
  const [t] = useTranslation();
  const lan = localStorage.getItem("userLanguage");
  const userAddress = JSON.parse(localStorage.getItem("userAddress"));

  const navigate = useNavigate();

  const [myOrder, setMyOrder] = useState(getCart());
  const [incenses, setIncenses] = useState([]);
  const [spices, setSpices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

    setIncenses(incensesRes.data);
    setSpices(spicesRes.data);
  };

  const increaseQuantity = (id, type) => {
    addToCart(id, type);
    setMyOrder(getCart());
  };

  const decreaseQuantity = (id, type) => {
    removeFromCart(id, type);
    setMyOrder(getCart());
  };

  const addNewOrder = (orderText) => {};

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
        {t("admin.header")}
      </Typography>
      <Grid container>
        <Box sx={{ color: "#ff0000ff", padding: "5px" }}>{errorMessage}</Box>
        <Grid sx={{ padding: "5px" }} size={{ xs: 12, md: 6 }}>
          <AddOrder addNewOrder={addNewOrder}></AddOrder>
        </Grid>
        <Grid sx={{ padding: "5px" }} size={{ xs: 12, md: 6 }}>
          
        </Grid>
      </Grid>
    </Box>
  );
}
