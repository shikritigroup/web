import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AddOrder({ addNewOrder }) {
  const [t] = useTranslation();
  const [orderText, setOrderText] = useState("");

  return (
    <Box>
      <Box>
        <textarea
          value={orderText}
          onChange={(e) => {
            setOrderText(e.target.value);
          }}
          style={{ padding: "5px", width: "100%", height: "100px" }}
        ></textarea>
      </Box>
      <Button
        disabled={!orderText}
        variant="contained"
        onClick={() => {
          addNewOrder(orderText);
          setOrderText("");
        }}
      >
        {t("admin.add-new-order.submit")}
      </Button>
    </Box>
  );
}
