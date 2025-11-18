import React, { useContext } from 'react';
import { IconButton, Tooltip, alpha } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Tooltip title={mode === 'light' ? 'Tema escuro' : 'Tema claro'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          mr: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            transform: 'rotate(180deg)',
          },
        }}
      >
        {mode === 'light' ? (
          <Brightness4 />
        ) : (
          <Brightness7 sx={{ color: 'warning.main' }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
