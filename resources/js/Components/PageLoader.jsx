
import React from 'react';
import { Box, Fade, Typography } from '@mui/material';
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
          backdropFilter: 'blur(12px)',
          zIndex: 9999,
          overflow: 'hidden',
        }}
      >
        {/* Estrelas de fundo */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.3)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
              '@keyframes twinkle': {
                '0%, 100%': {
                  opacity: 0.3,
                  transform: 'scale(1)',
                },
                '50%': {
                  opacity: 1,
                  transform: 'scale(1.5)',
                },
              },
            }}
          />
        ))}

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {/* Container do foguete */}
          <Box
            sx={{
              position: 'relative',
              width: 120,
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Anel externo pulsante */}
            <Box
              sx={{
                position: 'absolute',
                width: 120,
                height: 120,
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
                width: 90,
                height: 90,
                borderRadius: '50%',
                border: isDark ? '2px solid rgba(139, 92, 246, 0.4)' : '2px solid rgba(59, 130, 246, 0.4)',
                animation: 'ringPulse 2s cubic-bezier(0.4, 0, 0.6, 1) 0.5s infinite',
              }}
            />

            {/* Círculo de fundo do foguete */}
            <Box
              sx={{
                position: 'absolute',
                width: 70,
                height: 70,
                borderRadius: '50%',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
                animation: 'glow 2s ease-in-out infinite',
                '@keyframes glow': {
                  '0%, 100%': {
                    boxShadow: isDark
                      ? '0 0 20px rgba(99, 102, 241, 0.4)'
                      : '0 0 20px rgba(59, 130, 246, 0.4)',
                  },
                  '50%': {
                    boxShadow: isDark
                      ? '0 0 40px rgba(139, 92, 246, 0.6)'
                      : '0 0 40px rgba(147, 51, 234, 0.6)',
                  },
                },
              }}
            />

            {/* Foguete */}
            <Box
              sx={{
                fontSize: '48px',
                animation: 'rocketFloat 2s ease-in-out infinite',
                transform: 'rotate(-45deg)',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                '@keyframes rocketFloat': {
                  '0%, 100%': {
                    transform: 'rotate(-45deg) translateY(0px)',
                  },
                  '50%': {
                    transform: 'rotate(-45deg) translateY(-10px)',
                  },
                },
              }}
            >
              🚀
            </Box>

            {/* Partículas de fogo/propulsão */}
            {[...Array(5)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isDark
                    ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
                    : 'linear-gradient(135deg, #fb923c 0%, #ef4444 100%)',
                  bottom: '20%',
                  right: '20%',
                  animation: `particle${i} 1.5s ease-out ${i * 0.2}s infinite`,
                  [`@keyframes particle${i}`]: {
                    '0%': {
                      transform: 'translate(0, 0) scale(1)',
                      opacity: 1,
                    },
                    '100%': {
                      transform: `translate(${20 + i * 10}px, ${20 + i * 10}px) scale(0)`,
                      opacity: 0,
                    },
                  },
                }}
              />
            ))}
          </Box>

          {/* Texto de carregamento */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)',
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              Carregando
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                ml: 0.5,
              }}
            >
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: isDark ? theme.palette.primary.main : theme.palette.primary.main,
                    animation: 'dotBounce 1.4s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                    '@keyframes dotBounce': {
                      '0%, 80%, 100%': {
                        transform: 'scale(0)',
                        opacity: 0.5,
                      },
                      '40%': {
                        transform: 'scale(1)',
                        opacity: 1,
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default PageLoader;
