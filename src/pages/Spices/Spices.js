import { Box, Grid } from "@mui/material";
import ProductCart from "../../components/ProductCart/ProductCart";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Spices() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadLookups();
  }, [])

  const loadLookups = async () => {
    const res = await axios.get('/web/lookups/spices.json');
    setItems(res.data);
  }

  return (
    <Box sx={{ padding: "10px", textAlign: "left" }}>
      <Box></Box>
      <Grid container spacing={1}>
        {items?.length > 0 && items.map((item, index) => <ProductCart key={'best-product' + index} item={item} type="spices"></ProductCart>)}
      </Grid>
    </Box>
  )
}
