import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './MostSales.css'
import ProductCart from "../ProductCart/ProductCart";

export default function MostSales({ headerText, items, moreLink, type }) {
    return (
        items && <Box padding="5px">
            <Box textAlign="left" alignItems="flex-start" margin="0">
                <Typography variant="h5" margin="0">{headerText}</Typography>
                <Box textAlign="left" alignItems="flex-start" margin="0" bgcolor="#fff" padding="5px">
                    <Grid container spacing={1}>
                        <Grid size={{ lg: 11, sm: 11, xs: 12 }} container>
                            {
                                items?.length > 0 && items.map((item, index) => <ProductCart key={'best-product' + index} item={item} type={type}></ProductCart>)
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