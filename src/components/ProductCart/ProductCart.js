import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export default function ProductCart({ item }) {
    return <Grid size={{ lg: 2, sm: 3, xs: 12 }} sx={{ padding: "2px", border: '1px solid #4e4e4e1e', borderRadius: '5px' }}>
        <Box padding="5px">
            <Link to={'/web/productdetails/' + item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img alt={item.name} src={item.thumbnail} height="70px" width="100%"></img>
                <Tooltip title={item.name}>
                    <Box sx={{ textOverflow: "ellipsis", overflow: "hidden", display: "inline-block", textWrap: "nowrap", maxWidth: "98%" }}>
                        {item.name}
                    </Box>
                </Tooltip>
                <Box>
                    Price:
                    <Typography variant="caption" sx={{ textDecoration: "line-through", fontWeight: "bold", padding: '0 5px' }} >
                        ₹{Number(item.price.actualPrice).toFixed(2)}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                        ₹{Number(item.price.offerPrice).toFixed(2)}
                    </Typography>
                </Box>
            </Link>
            <Box sx={{ padding: "5px 0" }}>
                <AddShoppingCartIcon></AddShoppingCartIcon>
            </Box>
        </Box>
    </Grid >
}
