import { createContext, useContext, useState } from "react";

const Context = createContext();

export const ContextProvider = (props) => {
  const initialTheme = localStorage.getItem("theme")
  const [theme, setTheme] = useState(initialTheme);
  const values = {
    theme,
    setTheme,
  };
  return <Context.Provider value={values}>{props.children}</Context.Provider>;
};

export const useTheme = () => useContext(Context);
