import "./App.css";
import FirstPage from "./components/FirstPage";
import Prijava from "./components/Prijava";

import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />}></Route>
          <Route path="/prijava" element={<Prijava />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
