import React from 'react';
import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Box, Card, CardContent, Typography, alpha } from '@mui/material';

const Guest = ({ title, children }) => {
  return (
    <>
      <Head title={title} />

        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-30%',
              left: '-10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
              borderRadius: '50%',
            },
          }}
        >
          <Card
            sx={{
              maxWidth: 480,
              width: '100%',
              mx: 2,
              borderRadius: 4,
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
              background: (theme) => alpha(theme.palette.background.paper, 0.95),
              backdropFilter: 'blur(20px)',
              border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              position: 'relative',
              zIndex: 1,
              animation: 'fadeIn 0.6s ease-out',
              '@keyframes fadeIn': {
                from: {
                  opacity: 0,
                  transform: 'translateY(20px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <CardContent sx={{ p: 5 }}>
              {/* Logo */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3)',
                  }}
                >
                  <ApplicationLogo size="3rem" style={{ filter: 'brightness(0) invert(1)' }} />
                </Box>
              </Box>

              {/* Title */}
              <Typography
                variant='h4'
                align='center'
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {title}
              </Typography>

              <Typography
                variant='body2'
                align='center'
                color='text.secondary'
                sx={{ mb: 4 }}
              >
                Bem-vindo de volta! Por favor, faça login.
              </Typography>

              {/* Content */}
              {children}
            </CardContent>
          </Card>

          {/* Footer */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              textAlign: 'center',
              color: 'white',
              fontSize: '0.875rem',
              opacity: 0.8,
            }}
          >
            <Typography variant="caption" sx={{ color: 'white' }}>
              © {new Date().getFullYear()} - Todos os direitos reservados
            </Typography>
          </Box>
        </Box>
    </>
  );
};

export default Guest;
