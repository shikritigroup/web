import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./Footer.css";
import { ROUTE_PATH } from "../../helper/Constants";
import { Trans, useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 1, paddingTop: "50px" }}>
      <Box
        sx={{
          borderTop: 1,
          borderColor: "#c0c0c0ff",
          pt: 2,
          textAlign: "left",
        }}
      >
        <Grid container>
          <Grid size={{ md: 6, xs: 12 }}>
            <Box
              sx={{ lg: { textAlign: "left" }, sm: { textAlign: "center" } }}
            >
              <Box>{t("footer.title")}</Box>
            </Box>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <Box
              sx={{ lg: { textAlign: "right" }, sm: { textAlign: "center" } }}
            >
              <Box>{t("footer.desc.line1")}</Box>
              <Box>
                <Trans
                  i18nKey="footer.desc.line2"
                  components={{
                    contactus: (
                      <Link to={ROUTE_PATH.BASE + ROUTE_PATH.CONTACT}></Link>
                    ),
                    terms: (
                      <Link to={ROUTE_PATH.BASE + ROUTE_PATH.TERMS}></Link>
                    ),
                  }}
                ></Trans>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
