import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
        <Link to={'/web/productdetails/' + item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box padding="5px">
                <img src={item.thumbnail} height="70px" width="100%"></img>
                <Box sx={{ fontWeight: "Bold" }}>
                    {item.name}
                </Box>
                <Box>
                    <b>Price: </b>
                    <Typography variant="caption" sx={{ textDecoration: "line-through" }} >₹{item.price.actualPrice}</Typography>
                    <Typography variant="caption"> ₹{item.price.offerPrice}</Typography>
                </Box>
            </Box>
        </Link>
    </Grid>
}