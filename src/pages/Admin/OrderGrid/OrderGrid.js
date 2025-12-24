import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import AddOrder from "../AddOrder/AddOrder";
import { displayNo } from "../../../helper/Number";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { API, ROUTE_PATH } from "../../../helper/Constants";
import { decode } from "@toon-format/toon";

const OrderGrid = ({ handleOpen, orders, setOrders }) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [incenses, setIncenses] = useState();
  const [spices, setSpices] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [contacts, setContacts] = useState();

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
    const resContact = await axios.get(API.BASE + API.CONTACTS);

    setIncenses(incensesRes.data);
    setSpices(spicesRes.data);
    setContacts(resContact.data);
  };

  const addNewOrder = (orderText) => {
    try {
      setErrorMessage("");

      const order = decode(
        orderText.replaceAll('";n"', "\nn").replaceAll(";", "\n")
      );

      if (order?.i?.length > 0 && order?.y?.toLowerCase() === "o") {
        const items = order?.i?.map((itm, index) => {
          const details = itm.split(":");

          const product = details[0].startsWith("IN")
            ? incenses.filter((inc) => inc.id === details[0])[0]
            : spices.filter((spi) => spi.id === details[0])[0];

          if (product) {
            return {
              id: product.id,
              type: details[0].startsWith("IN")
                ? ROUTE_PATH.INCENSES
                : ROUTE_PATH.SPICES,
              count: details[1],
              name: product.name,
              price: product.price,
              thumbnail: product.thumbnail,
              order: index + 1,
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
          order: orders.length + 1,
          deliveryFee: contacts.deliveryFee
        };

        setOrders([newOrder, ...orders]);

        localStorage.setItem("orders", JSON.stringify([newOrder, ...orders]));

        handleOpen(newOrder.orderNo);
      } else {
        setErrorMessage("admin.invalid-order");
      }
    } catch {
      setErrorMessage("admin.invalid-order");
    }
  };

  return (
    <Grid container>
      <Grid sx={{ padding: "5px" }} size={{ xs: 12, md: 6 }}>
        {errorMessage && (
          <Box sx={{ color: "#ff0000ff", padding: "5px" }}>
            {t(errorMessage)}
          </Box>
        )}
        <AddOrder addNewOrder={addNewOrder}></AddOrder>
      </Grid>
      <Grid sx={{ padding: "5px" }} size={{ xs: 12, md: 6 }}>
        <Grid
          container
          sx={{ textAlign: "center", padding: 1, ...hideInMobile }}
        >
          <Grid size={{ xs: 2 }}></Grid>
          <Grid size={{ xs: 3 }}>{t("admin.orderNo")}</Grid>
          <Grid size={{ xs: 3 }}>{t("admin.phone")}</Grid>
          <Grid size={{ xs: 1 }}>{t("admin.items")}</Grid>
          <Grid size={{ xs: 1 }}>{t("admin.quant")}</Grid>
          <Grid size={{ xs: 2 }} sx={{ textAlign: "right" }}>
            {t("admin.total")}
          </Grid>
        </Grid>
        {orders
          ?.sort((a, b) => b.order - a.order)
          ?.map((order, index) => (
            <Grid
              container
              key={"order_" + index}
              sx={{ padding: 1, textAlign: "center" }}
            >
              <Grid size={{ sm: 2, xs: 0 }} sx={hideInMobile}>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleOpen(order?.orderNo);
                  }}
                >
                  {t("admin.view")}
                </Button>
              </Grid>
              <Grid size={{ sm: 0, xs: 3 }} sx={hideInOthers}>
                {t("admin.orderNo")}:
              </Grid>
              <Grid size={{ sm: 3, xs: 9 }}>{displayNo(order?.orderNo)}</Grid>
              <Grid size={{ sm: 0, xs: 3 }} sx={hideInOthers}>
                {t("admin.phone")}:
              </Grid>
              <Grid size={{ sm: 3, xs: 9 }}>{displayNo(order?.phone)}</Grid>
              <Grid size={{ sm: 0, xs: 2 }} sx={hideInOthers}>
                {t("admin.items")}:
              </Grid>
              <Grid size={{ sm: 1, xs: 1 }}>
                {displayNo(order?.items?.length)}
              </Grid>
              <Grid size={{ sm: 0, xs: 2 }} sx={hideInOthers}>
                {t("admin.quant")}:
              </Grid>
              <Grid size={{ sm: 1, xs: 1 }}>
                {displayNo(
                  order?.items
                    ?.map((item) => Number(item.count))
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                )}
              </Grid>
              <Grid size={{ sm: 0, xs: 2 }} sx={hideInOthers}>
                {t("admin.total")}:
              </Grid>
              <Grid size={{ sm: 2, xs: 3 }} sx={{ textAlign: "right" }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", padding: "0 3px" }}
                >
                  ₹
                  {displayNo(
                    order?.items
                      ?.map((item) =>
                        Number(item.price.offerPrice * item.count)
                      )
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                      .toFixed(2)
                  )}
                </Typography>
              </Grid>
              <Grid size={{ sm: 2, xs: 3 }} sx={hideInOthers}>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleOpen(order?.orderNo);
                  }}
                >
                  {t("admin.view")}
                </Button>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default OrderGrid;
