import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const Loader = ({
  size = 40,
  fullscreen = false,
  sx = {}
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const rocketSize = size > 60 ? 32 : size > 40 ? 24 : 16;

  const LoaderContent = () => (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Anel externo pulsante */}
      <Box
        sx={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          border: isDark ? '2px solid rgba(99, 102, 241, 0.3)' : '2px solid rgba(59, 130, 246, 0.3)',
          animation: 'ringPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          '@keyframes ringPulse': {
            '0%, 100%': {
              transform: 'scale(0.8)',
              opacity: 0.5,
            },
            '50%': {
              transform: 'scale(1.1)',
              opacity: 0.2,
            },
          },
        }}
      />

      {/* Anel intermediário */}
      <Box
        sx={{
          position: 'absolute',
          width: size * 0.75,
          height: size * 0.75,
          borderRadius: '50%',
          border: isDark ? '2px solid rgba(139, 92, 246, 0.4)' : '2px solid rgba(59, 130, 246, 0.4)',
          animation: 'ringPulse 2s cubic-bezier(0.4, 0, 0.6, 1) 0.5s infinite',
        }}
      />

      {/* Círculo de fundo do foguete */}
      <Box
        sx={{
          position: 'absolute',
          width: size * 0.6,
          height: size * 0.6,
          borderRadius: '50%',
          background: isDark
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
          animation: 'glow 2s ease-in-out infinite',
          '@keyframes glow': {
            '0%, 100%': {
              boxShadow: isDark
                ? '0 0 10px rgba(99, 102, 241, 0.4)'
                : '0 0 10px rgba(59, 130, 246, 0.4)',
            },
            '50%': {
              boxShadow: isDark
                ? '0 0 20px rgba(139, 92, 246, 0.6)'
                : '0 0 20px rgba(147, 51, 234, 0.6)',
            },
          },
        }}
      />

      {/* Foguete */}
      <Box
        sx={{
          fontSize: `${rocketSize}px`,
          animation: 'rocketFloat 2s ease-in-out infinite',
          transform: 'rotate(-45deg)',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
          '@keyframes rocketFloat': {
            '0%, 100%': {
              transform: 'rotate(-45deg) translateY(0px)',
            },
            '50%': {
              transform: 'rotate(-45deg) translateY(-4px)',
            },
          },
        }}
      >
        🚀
      </Box>

      {/* Partículas de fogo/propulsão */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: `${size * 0.08}px`,
            height: `${size * 0.08}px`,
            borderRadius: '50%',
            background: isDark
              ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
              : 'linear-gradient(135deg, #fb923c 0%, #ef4444 100%)',
            bottom: '25%',
            right: '25%',
            animation: `particle${i} 1.5s ease-out ${i * 0.3}s infinite`,
            [`@keyframes particle${i}`]: {
              '0%': {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1,
              },
              '100%': {
                transform: `translate(${10 + i * 5}px, ${10 + i * 5}px) scale(0)`,
                opacity: 0,
              },
            },
          }}
        />
      ))}
    </Box>
  );

  if (fullscreen) {
    return (
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
            ? 'rgba(15, 23, 42, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1300,
          ...sx,
        }}
      >
        <LoaderContent />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <LoaderContent />
    </Box>
  );
};

export default Loader;
