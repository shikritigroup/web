import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Spices from './pages/Spices';
import SignUP from './pages/SignUP';
import Cart from './pages/Cart';
import Incense from './pages/Incense';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Terms from './pages/Terms';
import Checkout from './pages/Checkout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import B2B from './pages/B2B/B2B';

const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#62a8c4ff'
    }
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header></Header>
        <div className='app-container'>
          <Routes>
            <Route path="web" element={<Home />} />
            <Route path="web/about" element={<About />} />
            <Route path="web/contact" element={<Contact />} />
            <Route path="web/cart" element={<Cart />} />
            <Route path="web/checkout" element={<Checkout />} />
            <Route path="web/terms" element={<Terms />} />
            <Route path="web/signUP" element={<SignUP />} />
            <Route path="web/incense" element={<Incense />} />
            <Route path="web/spices" element={<Spices />} />
            <Route path="web/b2b" element={<B2B />} />
            <Route path="*" element={<div><h1>404 Not Found</h1></div>} />
          </Routes>
        </div>
        <Footer></Footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
