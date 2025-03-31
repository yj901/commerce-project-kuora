import "./App.scss";
import { Home } from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Event from "./pages/Event/Event";

function App() {
  return (
    <div className="App">
      <Header />
      <Event />
    </div>
  );
}

export default App;
