import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import palette from '@/theme/palette';
import typography from '@/theme/typography';
import componentsOverride from '@/theme/overrides';
import shadows from '@/theme/shadows';
import customShadows from '@/theme/customShadows';

export const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
});

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(() => {
    // Recupera o tema salvo no localStorage
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  useEffect(() => {
    // Salva o tema no localStorage quando mudar
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => {
    const themeOptions = {
      palette: palette(mode),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    };

    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);

    return theme;
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
