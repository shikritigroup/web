import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { API } from "../../helper/Constants";
import axios from "axios";
import "./Admin.css";
import { useTranslation } from "react-i18next";
import AddOrder from "./AddOrder/AddOrder";
import { decode } from "@toon-format/toon";

export default function Admin() {
  const [t] = useTranslation();
  const [incenses, setIncenses] = useState();
  const [spices, setSpices] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadLookups();
  }, []);

  const loadLookups = async () => {
    const incensesRes = await axios.get(API.BASE + API.INCENSES);
    const spicesRes = await axios.get(API.BASE + API.SPICES);

    setIncenses(incensesRes.data);
    setSpices(spicesRes.data);
  };

  const addNewOrder = (orderText) => {
    try {
      setErrorMessage("");
      setOrders([
        decode(orderText.replaceAll('";n"', "\nn").replaceAll(";", "\n")),
        ...orders,
      ]);
    } catch {
      setErrorMessage("admin.invalid-order");
    }
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
        {t("admin.header")}
      </Typography>
      <Grid container>
        <Grid sx={{ padding: "5px" }} size={{ xs: 12, md: 6 }}>
          <Box sx={{ color: "#ff0000ff", padding: "5px" }}>
            {t(errorMessage)}
          </Box>
          <AddOrder addNewOrder={addNewOrder}></AddOrder>
        </Grid>
        <Grid sx={{ padding: "5px" }} size={{ xs: 12, md: 6 }}>
          {JSON.stringify(orders)}
        </Grid>
      </Grid>
    </Box>
  );
}
