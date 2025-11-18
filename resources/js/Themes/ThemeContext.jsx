import { useState } from "react";
import { createContext } from "react";
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";
import { useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage && localStorage.getItem('theme')
      ? (localStorage.getItem('theme') === 'dark' ? 'dark' : 'light')
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <MuiThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          {children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};
