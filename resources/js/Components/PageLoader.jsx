
import React from 'react';
import { Box, CircularProgress, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PageLoader = ({ show = true }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Fade in={show} timeout={300}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark
            ? 'rgba(15, 23, 42, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Círculo externo animado */}
          <Box
            sx={{
              position: 'absolute',
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: isDark
                ? theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
              opacity: 0.1,
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              '@keyframes pulse': {
                '0%, 100%': {
                  transform: 'scale(1)',
                  opacity: 0.1,
                },
                '50%': {
                  transform: 'scale(1.2)',
                  opacity: 0.05,
                },
              },
            }}
          />

          {/* Círculo do meio */}
          <Box
            sx={{
              position: 'absolute',
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: isDark
                ? theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
              opacity: 0.15,
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 0.5s infinite',
            }}
          />

          {/* Spinner principal */}
          <CircularProgress
            size={50}
            thickness={4}
            sx={{
              color: isDark ? theme.palette.primary.main : theme.palette.primary.main,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />

          {/* Logo ou ícone central (opcional) */}
          <Box
            sx={{
              position: 'absolute',
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: isDark
                ? theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
              animation: 'spin 3s linear infinite',
              '@keyframes spin': {
                '0%': {
                  transform: 'rotate(0deg) scale(1)',
                },
                '50%': {
                  transform: 'rotate(180deg) scale(0.8)',
                },
                '100%': {
                  transform: 'rotate(360deg) scale(1)',
                },
              },
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default PageLoader;
