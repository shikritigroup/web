import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Input, InputLabel } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../helper/Constants";

export default function B2B() {
  const [contacts, setContacts] = useState();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [interest, setInterest] = useState([]);

  useEffect(() => {
    loadLookups();
  }, [])

  const loadLookups = async () => {
    const res = await axios.get(API.BASE + API.CONTACTS);
    setContacts(res?.data);
  }

  const handleInterest = (value) => {
    const index = interest.indexOf(value);

    if (index > -1) {
      let newValue = [...interest];
      newValue.splice(index, 1);
      setInterest([...newValue]);
    }
    else {
      setInterest([...interest, value]);
    }
  }

  const handleSubmit = () => {
    const obj = {
      type: 'B2B',
      fullName,
      phoneNumber,
      email,
      pin,
      interest
    };
    window.open('https://wa.me/' + contacts.b2b + "?text='" + JSON.stringify(obj) + "'", '_blank')
  }

  return (
    <Box sx={{ padding: "10px", textAlign: "left" }}>
      <Box sx={{ padding: "40px 0", textAlign: "center", display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "block" }}>
          <FormGroup>
            <FormControl sx={{ display: "block", paddingBottom: "15px" }}>
              <InputLabel htmlFor="name">Full Name *</InputLabel>
              <Input required id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </FormControl>
            <FormControl sx={{ display: "block", paddingBottom: "15px" }}>
              <InputLabel htmlFor="phone">Phone Number *</InputLabel>
              <Input required id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </FormControl>
            <FormControl sx={{ display: "block", paddingBottom: "15px" }}>
              <InputLabel htmlFor="email">Email *</InputLabel>
              <Input required id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl sx={{ display: "block", paddingBottom: "15px" }}>
              <InputLabel htmlFor="pin">Pin *</InputLabel>
              <Input required id="pin" value={pin} onChange={(e) => setPin(e.target.value)} />
            </FormControl>
            <Box sx={{ textAlign: "left", paddingBottom: "15px" }}>Interest *</Box>
            <FormControl sx={{ display: "block" }}>
              <FormControlLabel control={
                <Checkbox checked={interest.indexOf("Incense") > -1} value="Incense" onChange={(e) => handleInterest(e.target.value)} />
              } label="Incense" />
              <FormControlLabel control={
                <Checkbox checked={interest.indexOf("Spice") > -1} value="Spice" onChange={(e) => handleInterest(e.target.value)} />
              } label="Spice" />
            </FormControl>
            <Button disabled={!fullName || !phoneNumber || !email || !pin || interest.length === 0} variant="contained" onClick={handleSubmit}>Submit</Button>
          </FormGroup>
        </Box>
      </Box>
    </Box>
  )
}
