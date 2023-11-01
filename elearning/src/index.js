import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./hook/useUser";
import { FavoriteProvider } from "./hook/useFavorite";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
