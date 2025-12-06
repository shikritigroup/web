import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';
import './Header.css';

const pages = ['Incense', 'Spices', 'About', 'Contact', 'Terms'];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Slide
            in="true"
            {...{ timeout: 400 }}
            transition={{ duration: 5000, delay: 0.1 }}
        >
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem key={'menuItem_' + index} onClick={handleCloseNavMenu}>
                                        <Link to={"web/" + page} className='menu-item'>{page}</Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Box sx={{ flexGrow: { xs: 7, md: 'revert', width: '150px' } }}>
                            <Link to="/web" className='menu-title' >
                                Shikriti
                            </Link>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className="menu-item-container">
                            {pages.map((page, index) => (
                                <Link key={'pages_' + index} className='menu-item' to={"web/" + page}>{page}</Link>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Cart">
                                <Link className='menu-item' to="web/Cart">
                                    <ShoppingCartIcon sx={{ my: 2, color: 'black', display: 'block' }}></ShoppingCartIcon>
                                </Link>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Slide>
    );
}
export default Header;
