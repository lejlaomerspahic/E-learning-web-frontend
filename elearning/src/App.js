import "./App.css";
import Pocetna from "./components/Pocetna";
import Prijava from "./components/Prijava";

import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Registracija from "./components/Registracija";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pocetna />}></Route>
          <Route path="/prijava" element={<Prijava />}></Route>
          <Route path="/user/registracija" element={<Registracija />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
