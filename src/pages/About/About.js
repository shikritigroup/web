import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: "10px" }}>
      <h1>{t("about.head")}</h1>
      <Box sx={{ textAlign: "left" }}>{t("about.details")}</Box>
    </Box>
  );
}
