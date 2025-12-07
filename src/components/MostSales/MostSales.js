import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './MostSales.css'

export default function MostSales({ headerText, items, moreLink }) {
    return (
        <Box padding="5px">
            <Box textAlign="left" alignItems="flex-start" margin="0">
                <Typography variant="h5" margin="0">{headerText}</Typography>
                <Box textAlign="left" alignItems="flex-start" margin="0" bgcolor="#fff" padding="5px">
                    <Grid container spacing={2}>
                        <Grid size={{ lg: 11, sm: 11, xs: 12 }} container>
                            {
                                items?.length > 0 && items.map((item, index) => <ProductCart key={'best-product' + index} item={item}></ProductCart>)
                            }
                        </Grid>
                        <Grid size={{ lg: 1, sm: 1, xs: 12 }} style={{ display: "flex" }}>
                            <Link to={moreLink} className="btn-more">
                                More
                                <ArrowForwardIcon sx={{ pl: 1 }} />
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}


export function ProductCart({ item }) {
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