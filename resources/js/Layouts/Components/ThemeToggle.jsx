import React, { useContext } from 'react';
import { Box, Tooltip, alpha } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useTheme } from '@mui/material/styles';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'} arrow>
      <Box
        onClick={toggleTheme}
        sx={{
          position: 'relative',
          width: 56,
          height: 28,
          borderRadius: '14px',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          background: isDark
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #FDB813 0%, #F59E0B 100%)',
          boxShadow: isDark
            ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
            : `0 4px 12px ${alpha('#F59E0B', 0.4)}`,
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          padding: '2px',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: isDark
              ? `0 6px 16px ${alpha(theme.palette.primary.main, 0.5)}`
              : `0 6px 16px ${alpha('#F59E0B', 0.5)}`,
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        }}
      >
        {/* Ícone do Sol (fixo à esquerda) */}
        <Box
          sx={{
            position: 'absolute',
            left: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            opacity: isDark ? 0.4 : 1,
            transition: 'all 0.3s ease',
            transform: isDark ? 'rotate(180deg) scale(0.8)' : 'rotate(0deg) scale(1)',
          }}
        >
          <LightMode
            sx={{
              fontSize: 13,
              color: '#fff',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          />
        </Box>

        {/* Ícone da Lua (fixo à direita) */}
        <Box
          sx={{
            position: 'absolute',
            right: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            opacity: isDark ? 1 : 0.4,
            transition: 'all 0.3s ease',
            transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0.8)',
          }}
        >
          <DarkMode
            sx={{
              fontSize: 13,
              color: '#fff',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          />
        </Box>

        {/* Botão deslizante (thumb) */}
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isDark ? 'translateX(28px)' : 'translateX(0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: isDark
                ? 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            '@keyframes pulse': {
              '0%, 100%': {
                transform: 'scale(1)',
                opacity: 1,
              },
              '50%': {
                transform: 'scale(1.5)',
                opacity: 0,
              },
            },
          }}
        >
          {/* Ícone dentro do thumb */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: isDark ? 'rotate(360deg)' : 'rotate(0deg)',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {isDark ? (
              <DarkMode
                sx={{
                  fontSize: 14,
                  color: theme.palette.primary.main,
                }}
              />
            ) : (
              <LightMode
                sx={{
                  fontSize: 14,
                  color: '#F59E0B',
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Tooltip>
  );
}
