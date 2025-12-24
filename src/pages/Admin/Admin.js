import { Box, Typography } from "@mui/material";
import { useState } from "react";
import "./Admin.css";
import { useTranslation } from "react-i18next";
import OrderDetails from "./OrderDetails/OrderDetails";
import OrderGrid from "./OrderGrid/OrderGrid";

export default function Admin() {
  const [t] = useTranslation();
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders") ?? "[]")
  );
  const [open, setOpen] = useState(false);
  const [selectedOrderNo, setSelectedOrderNo] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (orderNo) => {
    setSelectedOrderNo(orderNo);
    setOpen(true);
  };

  const increaseQuantity = (itemId, order) => {
    let item = order.items.filter((item) => item.id === itemId)[0];
    item = { ...item, count: Number(item.count) + 1 };
    let updatedOrder = { ...order };
    updatedOrder.items = [
      ...order.items.filter((item) => item.id !== itemId),
      ...[item],
    ];
    const updatedOrders = [
      ...orders?.filter((ord) => ord.orderNo !== selectedOrderNo),
      ...[updatedOrder],
    ];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const decreaseQuantity = (itemId, order) => {
    let item = order.items.filter((item) => item.id === itemId)[0];
    let updatedOrder = { ...order };
    if (item.count <= 1) {
      updatedOrder.items = [
        ...order.items.filter((item) => item.id !== itemId),
      ];
    } else {
      item = { ...item, count: Number(item.count) - 1 };
      updatedOrder.items = [
        ...order.items.filter((item) => item.id !== itemId),
        ...[item],
      ];
    }
    let updatedOrders = [
      ...orders?.filter((ord) => ord.orderNo !== selectedOrderNo),
    ];

    if (updatedOrder.items.length > 0) {
      updatedOrders = [...updatedOrders, ...[updatedOrder]];
    }

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
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
      <OrderGrid
        handleOpen={handleOpen}
        orders={orders}
        setOrders={setOrders}
      ></OrderGrid>
      <OrderDetails
        open={open}
        handleClose={handleClose}
        order={orders?.filter((ord) => ord.orderNo === selectedOrderNo)[0]}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      ></OrderDetails>
    </Box>
  );
}
