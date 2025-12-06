import { Box, Grid, Typography } from "@mui/material";

export default function MostSales({ headerText, items, moreLink }) {
    return (
        <Box padding="5px">
            <Box textAlign="left" alignItems="flex-start" margin="0">
                <Typography variant="h5" margin="0">{headerText}</Typography>
                <Box textAlign="left" alignItems="flex-start" margin="0" bgcolor="#fff" padding="5px">
                    <Grid container spacing={2}>
                        {
                            items?.length > 0 && items.map((item, index) => <ProductCart key={'best-product' + index} item={item}></ProductCart>)
                        }
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}


export function ProductCart({ item }) {
    return <div size={{ lg: 7, sm: 6, xs: 12 }}>
        Product Cart
    </div>
}