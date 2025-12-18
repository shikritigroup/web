import {
  Box,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../helper/Constants";
import { displayNo } from "../../helper/Number";
import { useTranslation } from "react-i18next";

export default function ProductCard({ item, type }) {
  const [t] = useTranslation();
  const theme = useTheme();
  const imageStretch = !useMediaQuery(theme.breakpoints.up("md"));
  const lan = localStorage.getItem("userLanguage");

  return (
    <Grid
      size={{ lg: 2, sm: 3, xs: 12 }}
      sx={{
        padding: "2px",
        border: "1px solid #4e4e4e1e",
        borderRadius: "5px",
      }}
    >
      <Box padding="5px">
        <Link
          to={"/" + ROUTE_PATH.PRODUCT_DETAILS + item.id + "/" + type}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box sx={{ textAlign: "center" }}>
            <img
              alt={item.name.find((n) => n.key === lan).value}
              src={item.thumbnail}
              height="100px"
              style={{
                maxWidth: "100%",
                width: imageStretch ? "100%" : "auto",
              }}
            ></img>
          </Box>
          <Tooltip title={item.name.find((n) => n.key === lan).value + ". " + item.description.find((n) => n.key === lan).value}>
            <Box
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "inline-block",
                textWrap: "nowrap",
                maxWidth: "98%",
              }}
            >
              {item.name.find((n) => n.key === lan).value}
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{ fontWeight: "bold", padding: "0 3px" }}
              >
                ₹{displayNo(Number(item.price.offerPrice).toFixed(2))}
              </Typography>
              <Typography
                variant="caption"
                sx={{ textDecoration: "line-through", color: "#888888ff" }}
              >
                ₹{displayNo(Number(item.price.actualPrice).toFixed(2))}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: "bold",
                  padding: "0 3px",
                  color: "#28d311ff",
                }}
              >
                {displayNo(item.price.offer)} {t("off")}
              </Typography>
            </Box>
          </Tooltip>
        </Link>
      </Box>
    </Grid>
  );
}
