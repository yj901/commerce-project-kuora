import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext";
import PageTop from "./utils/PageTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Payment from "./pages/Payment/Payment";
import Products from "./pages/Products/Products";
import Detail from "./pages/Detail/Detail";
import Event from "./pages/Event/Event";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import "./App.scss";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <PageTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
