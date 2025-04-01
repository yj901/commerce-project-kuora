import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Payment from "./pages/Payment/Payment";
import Products from "./pages/Products/Products";
import Detail from "./pages/Detail/Detail";
import Event from "./pages/Event/Event";
import "./App.scss";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Event />} />
        <Route path="/product" element={<Products />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
