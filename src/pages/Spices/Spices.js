import { Box, FormControl, Grid, Input, InputLabel } from "@mui/material";
import ProductCart from "../../components/ProductCart/ProductCart";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Spices() {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    loadLookups();
  }, [])

  const loadLookups = async () => {
    const res = await axios.get('/web/lookups/spices.json');
    setItems(res.data);
  }

  return (
    <Box sx={{ padding: "10px", textAlign: "left" }}>
      <Box sx={{ padding: "40px 0", textAlign: "center", display: "flex", justifyContent: "center" }}>
        <FormControl>
          <InputLabel htmlFor="search-text">Search</InputLabel>
          <Input id="search-text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </FormControl>
      </Box>
      <Grid container spacing={1}>
        {items?.length > 0 && items.filter((item) => (!searchText || item.name.toLowerCase().indexOf(searchText?.toLowerCase()) > -1))
          .map((item, index) => <ProductCart key={'best-product' + index} item={item} type="incenses"></ProductCart>)}
      </Grid>
    </Box>
  )
}
