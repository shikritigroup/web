import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Tarms() {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: "10px" }}>
      <h1>{t("terms.head")}</h1>
      <Box
        sx={{ textAlign: "left" }}
        dangerouslySetInnerHTML={{ __html: t("terms.details") }}
      ></Box>
      ;
    </Box>
  );
}
