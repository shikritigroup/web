import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";
import "./Header.css";
import { ROUTE_PATH } from "../../helper/Constants";
import { FormControl, InputLabel, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const pages = [
  { text: "menu.incenses", path: ROUTE_PATH.INCENSES },
  { text: "menu.spices", path: ROUTE_PATH.SPICES },
  { text: "menu.about", path: ROUTE_PATH.ABOUT },
  { text: "menu.contact", path: ROUTE_PATH.CONTACT },
  { text: "menu.terms", path: ROUTE_PATH.TERMS },
  { text: "menu.b2b", path: ROUTE_PATH.B2B },
];

function Header() {
  const { t, i18n } = useTranslation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [langauge, setLangauge] = useState(
    localStorage.getItem("userLanguage") ?? "en"
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    localStorage.setItem("userLanguage", langauge);
    setLangauge(langauge);
    i18n.changeLanguage(langauge);
    document.title = t("title");
  }, [langauge, i18n]);

  return (
    <Slide
      in="true"
      {...{ timeout: 400 }}
      transition={{ duration: 5000, delay: 0.1 }}
    >
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" }, textAlign: "left" }}
              >
                <MenuItem>
                  <FormControl>
                    <InputLabel
                      id="lang-select-label"
                      sx={{ color: "#000 !important" }}
                    >
                      {t("language")}
                    </InputLabel>
                    <Select
                      labelId="lang-select-label"
                      id="lang-select"
                      value={langauge}
                      label="Langauge"
                      onChange={(e) => {
                        setLangauge(e.target.value);
                      }}
                    >
                      <MenuItem value={"be"}>{t("bengali")}</MenuItem>
                      <MenuItem value={"en"}>{t("english")}</MenuItem>
                    </Select>
                  </FormControl>
                </MenuItem>
                {pages.map((page, index) => (
                  <MenuItem
                    key={"menuItem_" + index}
                    onClick={handleCloseNavMenu}
                    sx={{ textAlign: "left" }}
                  >
                    <Link to={page.path} className="menu-item">
                      {t(page.text)}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: { xs: 7, md: "revert", width: "60px" } }}>
              <Link to={ROUTE_PATH.BASE} className="menu-title">
                <img alt="logo" src="/web/images/logo.png"></img>
              </Link>
            </Box>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="menu-item-container"
            >
              {pages.map((page, index) => (
                <Link
                  key={"pages_" + index}
                  className="menu-item"
                  to={page.path}
                >
                  {t(page.text)}
                </Link>
              ))}
              <FormControl>
                <InputLabel
                  id="lang-select-label"
                  sx={{ color: "#000 !important" }}
                >
                  {t("language")}
                </InputLabel>
                <Select
                  labelId="lang-select-label"
                  id="lang-select"
                  value={langauge}
                  label="Langauge"
                  onChange={(e) => {
                    setLangauge(e.target.value);
                  }}
                >
                  <MenuItem value={"be"}>{t("bengali")}</MenuItem>
                  <MenuItem value={"en"}>{t("english")}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Tooltip title={t("cart.header")}>
                <Link to={ROUTE_PATH.CART} className="cart-icon">
                  <ShoppingCartIcon
                    sx={{ my: 2, color: "black", display: "block" }}
                  ></ShoppingCartIcon>
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
