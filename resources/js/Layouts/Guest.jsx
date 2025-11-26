import React from 'react';
import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Box, Card, CardContent, Typography, alpha, Grid, Stack, Divider } from '@mui/material';

const heroHighlights = [
  {
    label: 'Segurança reforçada',
    description: 'Monitoramento em tempo real e MFA aplicado a cada login.',
  },
  {
    label: 'Performance 24/7',
    description: 'Disponibilidade garantida e respostas em milissegundos.',
  },
  {
    label: 'Equipe conectada',
    description: 'Fluxos colaborativos e insights direto no painel.',
  },
];

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
            background: 'linear-gradient(120deg, #0f172a 0%, #1d4ed8 50%, #9333ea 100%)',
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 6, md: 0 },
            '&:before': {
              content: '""',
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-20%',
              left: '-10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
              borderRadius: '50%',
            },
          }}
        >
          <Grid
            container
            spacing={4}
            alignItems="stretch"
            sx={{
              width: '100%',
              maxWidth: 1200,
              mx: 'auto',
              px: { xs: 3, md: 6 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Grid item xs={12} md={6}
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Box
                sx={{
                  borderRadius: 5,
                  p: 5,
                  color: 'white',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(30px)',
                  boxShadow: '0 25px 80px rgba(15, 23, 42, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.8 }}>
                    Painel Inteligente
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    Controle total em uma experiência moderna e responsiva.
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Visualize indicadores, acompanhe sua equipe e mantenha processos críticos protegidos com autenticação avançada.
                  </Typography>
                </Stack>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

                <Stack spacing={3}>
                  {heroHighlights.map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        borderRadius: 3,
                        p: 3,
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85 }}>
                        {item.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  maxWidth: 520,
                  width: '100%',
                  mx: { xs: 'auto', md: 0 },
                  borderRadius: 4,
                  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
                  background: (theme) => alpha(theme.palette.background.paper, 0.95),
                  backdropFilter: 'blur(20px)',
                  border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                  position: 'relative',
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
                <CardContent sx={{ p: { xs: 4, md: 5 } }}>
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
            </Grid>
          </Grid>

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
