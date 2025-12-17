import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Spices from "./pages/Spices/Spices";
import SignUP from "./pages/SignUP";
import Cart from "./pages/Cart/Cart";
import Incenses from "./pages/Incenses/Incenses";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Terms from "./pages/Terms";
import Checkout from "./pages/Checkout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import B2B from "./pages/B2B/B2B";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ROUTE_PATH } from "./helper/Constants";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffc115cb",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <ScrollToTop />
        <Header></Header>
        <div className="app-container">
          <Routes>
            <Route path={ROUTE_PATH.BASE} element={<Home />} />
            <Route
              path={ROUTE_PATH.ABOUT}
              element={<About />}
            />
            <Route
              path={ROUTE_PATH.CONTACT}
              element={<Contact />}
            />
            <Route
              path={ROUTE_PATH.CART}
              element={<Cart />}
            />
            <Route
              path={ROUTE_PATH.CHECKOUT}
              element={<Checkout />}
            />
            <Route
              path={ROUTE_PATH.TERMS}
              element={<Terms />}
            />
            <Route
              path={ROUTE_PATH.SIGNUP}
              element={<SignUP />}
            />
            <Route
              path={ROUTE_PATH.INCENSES}
              element={<Incenses />}
            />
            <Route
              path={ROUTE_PATH.SPICES}
              element={<Spices />}
            />
            <Route path={ROUTE_PATH.B2B} element={<B2B />} />
            <Route
              path={ROUTE_PATH.PRODUCT_DETAILS + ":id/:type"}
              element={<ProductDetails />}
            />
            <Route
              path="*"
              element={
                <div>
                  <h1>404 Not Found</h1>
                </div>
              }
            />
          </Routes>
        </div>
        <Footer></Footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
