import { Box, Typography } from "@mui/material";
import CallIcon from '@mui/icons-material/Call';
import SvgIcon from '@mui/material/SvgIcon';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Contact() {
  const svgPath = "M12 2C6.5 2 2 6.5 2 12c0 1.5 0.4 2.9 1 4.1l-1 4l4-1c1.2 0.6 2.6 1 4 1 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.3 0-2.6-0.3-3.7-1l-3 1 1-3c-0.7-1.1-1-2.4-1-3.7 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8zm4.5-5.5c-0.2-0.1-0.9-0.4-1.3-0.5s-0.7-0.1-1 0c-0.3 0.1-0.4 0.4-0.6 0.5-0.1 0.2-0.3 0.2-0.5 0.1-0.2-0.1-0.9-0.3-1.7-1.1s-1.3-1.6-1.4-1.7c-0.1-0.1 0-0.2 0.1-0.2 0.1-0.1 0.2-0.2 0.3-0.3 0.1-0.1 0.1-0.2 0.2-0.2 0.1-0.1 0.1-0.2 0.1-0.3 0-0.1 0-0.2 0-0.3s-0.1-0.3-0.2-0.4c-0.1-0.1-0.3-0.2-0.4-0.3-0.1-0.1-0.2-0.2-0.4-0.2s-0.3-0.1-0.5-0.1c-0.2 0-0.4 0.1-0.6 0.1s-0.4 0.1-0.6 0.2c-0.2 0.2-0.7 0.6-0.7 1.5s0.7 1.7 0.8 1.9c0.1 0.2 1.4 2.1 3.4 3s3.1 0.8 3.7 0.7c0.6-0.1 1.7-0.7 1.9-1.3 0.2-0.6 0.2-1 0.1-1.3 0-0.2-0.1-0.3-0.2-0.4z";
  const [contacts, setContacts] = useState();

  useEffect(() => {
    loadLookups();
  }, [])

  const loadLookups = async () => {
    const res = await axios.get(`/web/lookups/contacts.json`);
    setContacts(res?.data);
  }

  return (
    contacts &&
    <Box sx={{ padding: "10px" }}>
      <h1>Contact us</h1>
      <Box>
        <Box sx={{ display: "inline-flex" }}>
          <CallIcon></CallIcon>
          <Box sx={{ paddingLeft: "10px", display: "inline-flex" }}>
            {
              contacts.calls.map((call, index) => {
                return <Box key={"call_" + index}>
                  {index > 0 &&
                    <Typography sx={{ padding: "0 5px", display: "inline-flex" }}> / </Typography>}
                  <Link to={"tel:+91" + call}>{call}</Link>
                </Box>
              })
            }
          </Box>
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: "inline-flex" }}>
          <SvgIcon>
            <path d={svgPath} />
          </SvgIcon>
          <Box sx={{ paddingLeft: "10px", display: "inline-flex", display: "inline-flex" }}>
            {
              contacts.whatsApps.map((whatsApp, index) => {
                return <Box key={"call_" + index}>
                  {index > 0 &&
                    <Typography sx={{ padding: "0 5px", display: "inline-flex" }}> / </Typography>}
                  <Link to={"https://wa.me/+91" + whatsApp}>{whatsApp}</Link>
                </Box>
              })
            }
          </Box>
        </Box>
      </Box>
    </Box >
  )
}
