import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { API, ROUTE_PATH } from "../../../helper/Constants";
import { displayNo } from "../../../helper/Number";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import axios from "axios";

const OrderDetails = ({
  open,
  handleClose,
  order,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const [t] = useTranslation();
  const lan = localStorage.getItem("userLanguage");
  const [upiLink, setUpiLink] = useState();
  const [contacts, setContacts] = useState();
  const [fullName, setFullName] = useState(order?.customerName);
  const [phoneNumber, setPhoneNumber] = useState(order?.phone);
  const [address, setAddress] = useState(order?.address);

  useEffect(() => {
    const total =
      order?.items?.reduce(
        (a, v) => (a = a + v.price.offerPrice * v.count),
        0
      ) + order?.deliveryFee;
    if (total > 0) {
      setUpiLink(
        `upi://pay?pa=${encodeURIComponent(
          contacts?.upiId
        )}&pn=${encodeURIComponent(contacts?.upiName)}&am=${encodeURIComponent(
          total
        )}&cu=${encodeURIComponent(
          contacts?.upiCurrency
        )}&tn=${encodeURIComponent(order?.orderNo)}`
      );
    } else {
      setUpiLink("");
    }
  }, [order, contacts]);

  useEffect(() => {
    loadLookups();
  }, []);

  const loadLookups = async () => {
    const resContact = await axios.get(API.BASE + API.CONTACTS);
    setContacts(resContact.data);
  };

  const handleSubmit = () => {};

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="span">
            {t("order-details.head")}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: 1 }}>
        {order && (
          <Box>
            <Grid container>
              <Grid size={{ xs: 12, sm: "auto" }} sx={{ padding: "2px" }}>
                <Button variant="contained">Mark as Paid</Button>
              </Grid>
              <Grid size={{ xs: 12, sm: "auto" }} sx={{ padding: "2px" }}>
                <Button variant="contained">Delete</Button>
              </Grid>
              <Grid size={{ xs: 12, sm: "auto" }} sx={{ padding: "2px" }}>
                <Button variant="contained">Print</Button>
              </Grid>
            </Grid>
            <Box sx={{ padding: "5px" }}>
              {t("admin.orderNo")}
              {": "}
              {displayNo(order?.orderNo)}
            </Box>
            <Grid container sx={{ alignItems: "center", padding: "5px" }}>
              <Typography
                variant="h5"
                sx={{ padding: "10px 20px 10px 0", fontWeight: "bold" }}
              >
                {t("cart.total")}: ₹{" "}
                {displayNo(
                  (
                    order?.items?.reduce(
                      (a, v) => (a = a + v.price.offerPrice * v.count),
                      0
                    ) + order?.deliveryFee
                  ).toFixed(2)
                )}
              </Typography>
              <Typography variant="span" sx={{ padding: "10px 20px 10px 0" }}>
                {t("cart.delivery-fee")}: ₹{" "}
                {displayNo(order?.deliveryFee?.toFixed(2))}
              </Typography>
              <Typography variant="span" sx={{ padding: "10px 20px 10px 0" }}>
                {t("cart.item-total")}: ₹{" "}
                {displayNo(
                  order?.items
                    ?.reduce(
                      (a, v) => (a = a + v.price.offerPrice * v.count),
                      0
                    )
                    .toFixed(2)
                )}
              </Typography>
            </Grid>
            <Box sx={{ padding: 0 }}>
              <Grid container sx={{ padding: 0 }}>
                <Grid
                  size={{ lg: 2, md: 4, sm: 6, xs: 12 }}
                  sx={{ padding: 1 }}
                >
                  <Grid
                    size={{ xs: 12 }}
                    sx={{ padding: "5px", border: "1px solid #80787869" }}
                  >
                    <Box
                      style={{
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "5px",
                      }}
                    >
                      {upiLink && (
                        <QRCode
                          value={upiLink}
                          size={150}
                          viewBox={`0 0 150 150`}
                        />
                      )}
                    </Box>
                    <Box style={{ textAlign: "center" }}>
                      <Box>{t("order-details.payment.text")}</Box>
                      <img
                        src="./images/Gpay.svg"
                        alt="gpay"
                        height="15px"
                        style={{ padding: "2px" }}
                      />
                      <img
                        src="./images/Paytm.svg"
                        alt="gpay"
                        height="15px"
                        style={{ padding: "2px" }}
                      />
                      <img
                        src="./images/PhonePe.svg"
                        alt="gpay"
                        height="15px"
                        style={{ padding: "2px" }}
                      />
                      <img
                        src="./images/UPI.svg"
                        alt="gpay"
                        height="15px"
                        style={{ padding: "2px" }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  size={{ lg: 4, md: 8, sm: 6, xs: 12 }}
                  sx={{ padding: 1 }}
                >
                  <Grid
                    size={{ xs: 12 }}
                    sx={{ padding: "10px 5px", border: "1px solid #80787869" }}
                  >
                    <FormGroup>
                      <FormControl
                        sx={{ display: "block", paddingBottom: "15px" }}
                      >
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
                      <FormControl
                        sx={{ display: "block", paddingBottom: "15px" }}
                      >
                        <InputLabel htmlFor="phone">
                          {t("b2b.phone")} *
                        </InputLabel>
                        <Input
                          required
                          id="phone"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          sx={{ width: "100%" }}
                        />
                      </FormControl>
                      <FormControl
                        sx={{ display: "block", paddingBottom: "15px" }}
                      >
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
                      <Button
                        disabled={!fullName || !phoneNumber || !address}
                        variant="contained"
                        onClick={handleSubmit}
                      >
                        {t("admin.save")}
                      </Button>
                    </FormGroup>
                  </Grid>
                </Grid>
                <Grid size={{ lg: 6, xs: 12 }} sx={{ padding: 1 }}>
                  <Grid
                    size={{ xs: 12 }}
                    sx={{ padding: "5px", border: "1px solid #80787869" }}
                  >
                    {order?.items
                      ?.sort((a, b) => a.order - b.order)
                      .map((item, index) => {
                        return (
                          <Grid container key={"details_item_" + index}>
                            <Grid
                              size={{ md: 12, xs: 12 }}
                              container
                              sx={{
                                padding: "2px",
                                borderBottom: 1,
                                borderColor: "#9494943d",
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
                                    item.id +
                                    "/" +
                                    item.type
                                  }
                                  style={{ textAlign: "center" }}
                                >
                                  <img
                                    src={item.thumbnail}
                                    alt={item.thumbnail}
                                    className="cart-img"
                                  ></img>
                                </Link>
                              </Grid>
                              <Grid size={{ md: 10, xs: 8 }} container>
                                <Grid
                                  size={{ sm: 4 }}
                                  sx={{ padding: "5px", alignSelf: "center" }}
                                >
                                  {item.name.find((n) => n.key === lan).value}
                                </Grid>
                                <Grid
                                  size={{ sm: 4 }}
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
                                      Number(item.price.offerPrice).toFixed(2)
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
                                      Number(item.price.actualPrice).toFixed(2)
                                    )}
                                  </Typography>
                                  <br />
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
                                        item.price.offerPrice * item.count
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
                                        item.price.actualPrice * item.count
                                      ).toFixed(2)
                                    )}
                                  </Typography>
                                  <br />
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: "bold",
                                      padding: "0 3px",
                                      color: "#28d311ff",
                                    }}
                                  >
                                    {displayNo(item.price.offer)}
                                    {t("off")}
                                  </Typography>
                                </Grid>
                                <Grid
                                  size={{ sm: 4 }}
                                  sx={{
                                    padding: "5px",
                                    display: "flex",
                                    justifyContent: "right",
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
                                      decreaseQuantity(item.id, order)
                                    }
                                  >
                                    -
                                  </Button>
                                  <Typography
                                    sx={{
                                      textAlign: "center",
                                      minWidth: "35px",
                                    }}
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
                                      increaseQuantity(item.id, order)
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
              </Grid>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
