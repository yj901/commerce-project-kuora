import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Payment from "./pages/Payment/Payment";
import Products from "./pages/Products/Products";
import Detail from "./pages/Detail/Detail";
import Event from "./pages/Event/Event";
import { Home } from "./pages/Home/Home";
import "./App.scss";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
