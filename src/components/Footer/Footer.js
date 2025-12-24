import { Box, Grid, useTheme } from "@mui/material";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../helper/Constants";

export default function Footer() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [contacts, setContacts] = useState();

  useEffect(() => {
    loadLookups();
  }, []);

  const loadLookups = async () => {
    const res = await axios.get(API.BASE + API.CONTACTS);
    setContacts(res?.data);
  };

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
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
            <Box>
              <Box
                sx={{
                  [theme.breakpoints.up("sm")]: {
                    textAlign: "left",
                  },
                  [theme.breakpoints.up("xs")]: {
                    textAlign: "center",
                  },
                }}
              >
                {t("footer.desc.line")}
              </Box>
            </Box>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <Box>
              <Box
                sx={{
                  [theme.breakpoints.up("sm")]: {
                    textAlign: "right",
                  },
                  [theme.breakpoints.up("xs")]: {
                    textAlign: "center",
                  },
                }}
              >
                {contacts?.facebookLink && (
                  <Link to={contacts.facebookLink}>
                    <FacebookIcon color="info" />
                  </Link>
                )}
                {contacts?.instagramLink && (
                  <Link to={contacts.instagramLink}>
                    <InstagramIcon color="error" />
                  </Link>
                )}
                {contacts?.youtubeLink && (
                  <Link to={contacts.youtubeLink}>
                    <YouTubeIcon color="error" />
                  </Link>
                )}
                {contacts?.linkedinLink && (
                  <Link to={contacts.linkedinLink}>
                    <LinkedInIcon color="info" />
                  </Link>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
