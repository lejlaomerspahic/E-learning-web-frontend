import "./App.css";
import Pocetna from "./components/Pocetna";
import Prijava from "./components/Prijava";

import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Registracija from "./components/Registracija";
import Home from "./components/Home";
import UserProvider from "./hook/useUser";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pocetna />}></Route>
            <Route path="/user/signin" element={<Prijava />}></Route>
            <Route path="/user/signup" element={<Registracija />}></Route>
            <Route path="/home" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
