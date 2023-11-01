import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);

  return (
    <FavoriteContext.Provider value={{ favorite, setFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};

export { FavoriteProvider, useFavorite };
