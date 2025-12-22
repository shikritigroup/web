import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { API } from "../../helper/Constants";
import axios from "axios";
import "./Admin.css";
import { useTranslation } from "react-i18next";
import AddOrder from "./AddOrder/AddOrder";
import { decode } from "@toon-format/toon";
import { displayNo } from "../../helper/Number";
import { useTheme } from "@mui/material/styles";
import OrderDetails from "./OrderDetails/OrderDetails";
import OrderGrid from "./OrderGrid/OrderGrid";

export default function Admin() {
  const [t] = useTranslation();
  const theme = useTheme();
  const [incenses, setIncenses] = useState();
  const [spices, setSpices] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [orders, setOrders] = useState(localStorage.getItem("orders") ?? []);
  const [open, setOpen] = useState(false);
  const [selectedOrderNo, setSelectedOrderNo] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (orderNo) => {
    setSelectedOrderNo(orderNo);
    setOpen(true);
  };

  const hideInMobile = {
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  };

  const hideInOthers = {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("xs")]: {
      display: "flex",
    },
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

  const addNewOrder = (orderText) => {
    try {
      setErrorMessage("");

      const order = decode(
        orderText.replaceAll('";n"', "\nn").replaceAll(";", "\n")
      );

      if (order?.i?.length > 0 && order?.y?.toLowerCase() === "o") {
        const items = order?.i?.map((itm) => {
          const details = itm.split(":");

          const product = details[0].startsWith("IN")
            ? incenses.filter((inc) => inc.id === details[0])[0]
            : spices.filter((spi) => spi.id === details[0])[0];

          if (product) {
            return {
              id: product.id,
              quantity: details[1],
              name: product.name,
              price: product.price,
            };
          } else {
            return undefined;
          }
        });

        const newOrder = {
          customerName: order.n,
          address: order.a,
          pin: order.padEnd,
          lan: order.l,
          phone: order.h,
          items,
          ...{ orderNo: Date.now() },
        };

        setOrders([newOrder, ...orders]);

        localStorage.setItem("orders", JSON.stringify([newOrder, ...orders]));

        setSelectedOrderNo(newOrder.orderNo);
        setOpen(true);
      } else {
        setErrorMessage("admin.invalid-order");
      }
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
      <OrderGrid handleOpen={handleOpen}></OrderGrid>
      <OrderDetails
        open={open}
        handleClose={handleClose}
        selectedOrderNo={selectedOrderNo}
      ></OrderDetails>
    </Box>
  );
}
