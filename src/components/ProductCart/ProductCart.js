import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCart({ item, type }) {
    return <Grid size={{ lg: 2, sm: 3, xs: 12 }} sx={{ padding: "2px", border: '1px solid #4e4e4e1e', borderRadius: '5px' }}>
        <Box padding="5px">
            <Link to={'/web/productdetails/' + item.id + '/' + type} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img alt={item.name} src={item.thumbnail} height="70px" width="100%"></img>
                <Tooltip title={item.name + '. ' + item.description}>
                    <Box sx={{ textOverflow: "ellipsis", overflow: "hidden", display: "inline-block", textWrap: "nowrap", maxWidth: "98%" }}>
                        {item.name}
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: "bold", padding: '0 3px' }}>
                            ₹{Number(item.price.offerPrice).toFixed(2)}
                        </Typography>
                        <Typography variant="caption" sx={{ textDecoration: "line-through", color: '#888888ff' }} >
                            ₹{Number(item.price.actualPrice).toFixed(2)}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: "bold", padding: '0 3px', color: '#28d311ff' }} >
                            {item.price.offer} off
                        </Typography>
                    </Box>
                </Tooltip>
            </Link>
        </Box>
    </Grid >
}
