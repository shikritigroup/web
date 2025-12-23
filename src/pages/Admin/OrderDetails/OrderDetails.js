import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../../helper/Constants";
import { displayNo } from "../../../helper/Number";

const OrderDetails = ({
  open,
  handleClose,
  order,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const [t] = useTranslation();
  const lan = localStorage.getItem("userLanguage");

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg" fullWidth>
      <DialogTitle>
        <div
          style={{
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
        </div>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: 1 }}>
        {" "}
        <Typography variant="h5" sx={{ padding: "10px 0" }}>
          {t("cart.total")}: ₹{" "}
          {displayNo(
            order?.items
              ?.reduce((a, v) => (a = a + v.price.offerPrice * v.count), 0)
              .toFixed(2)
          )}
        </Typography>
        <Box sx={{ padding: 0 }}>
          <Grid container sx={{ padding: 0 }}>
            <Grid size={{ md: 6 }} sx={{ padding: 1 }}>
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
                              size={{ lg: 4 }}
                              sx={{ padding: "5px", alignSelf: "center" }}
                            >
                              {item.name.find((n) => n.key === lan).value}
                            </Grid>
                            <Grid
                              size={{ lg: 5 }}
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
                              size={{ lg: 3 }}
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
                                onClick={() => decreaseQuantity(item.id, order)}
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
                                onClick={() => increaseQuantity(item.id, order)}
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
            <Grid size={{ md: 3 }} sx={{ padding: 1 }}>
              <Grid
                size={{ xs: 12 }}
                sx={{ padding: "5px", border: "1px solid #80787869" }}
              ></Grid>
            </Grid>
            <Grid size={{ md: 3 }} sx={{ padding: 1 }}>
              <Grid
                size={{ xs: 12 }}
                sx={{ padding: "5px", border: "1px solid #80787869" }}
              ></Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
