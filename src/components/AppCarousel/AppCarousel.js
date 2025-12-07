import { Box, Grow, Typography } from "@mui/material";
import "./AppCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function AppCarousel({ name, list, className, link, exploretype, btnText, t1 = '', t2 = '', t3 = '', t4 = '' }) {
    return (
        list?.length > 0 &&
        <Grow
            in={true}
            style={{ transformOrigin: '0 0 0', timeout: 1000 }}
        >
            <Box className="explore-container">
                <Carousel showArrows={false} autoPlay={true} showThumbs={false} infiniteLoop={true} showStatus={false}>
                    {list.map((item, index) => <img alt={item} key={'carousel_item_' + name + '_' + index} src={item} className={className} />)}
                </Carousel>
                {btnText && <ButtonExplore link={link} text={btnText} type={exploretype} />}
                <Box className="details-texts">
                    <Typography variant="h3">{t1}</Typography>
                    <Typography variant="h4">{t2}</Typography>
                    <Typography variant="h5">{t3}</Typography>
                    <Typography variant="h6">{t4}</Typography>
                </Box>
            </Box>
        </Grow>
    )
}

function ButtonExplore({ link, text, type }) {
    return (<Link to={link} className={'btn-explore btn-explore-' + (type ?? 'primary')}>
        {text}
        <ArrowForwardIcon sx={{ pl: 1 }} />
    </Link>)
}
