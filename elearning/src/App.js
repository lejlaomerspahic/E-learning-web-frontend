import "./App.css";
import Pocetna from "./components/Pocetna";
import Prijava from "./components/Prijava";

import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Registracija from "./components/Registracija";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pocetna />}></Route>
          <Route path="/user/signin" element={<Prijava />}></Route>
          <Route path="/user/signup" element={<Registracija />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
