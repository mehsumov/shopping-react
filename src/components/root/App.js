import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import { useSelector } from "react-redux";

function App() {
  const state = useSelector(state=>state)
  console.log(state);
  return (
    <div className="container">
      <Navi />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prodct" element={<Dashboard />} />
        <Route path="/cart" element={<CartDetail />} />
      </Routes>
    </div>
  );
}

export default App;
