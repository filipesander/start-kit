import React, { useEffect } from 'react';
import { Link as InertiaLink, useForm } from '@inertiajs/react';
import Guest from '@/Layouts/Guest';
import { Box, Button, Switch, CircularProgress, FormControlLabel, Link, TextField, InputAdornment, IconButton, Alert, alpha, Typography, Paper, Stack, Divider, Grid, Tooltip } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Google, Apple, Window, SupportAgent, ChatBubbleOutline, Key } from '@mui/icons-material';

export default function Login({ status, denied, canResetPassword }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [capsLockOn, setCapsLockOn] = React.useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: true,
  });



  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('panel.login'));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordKeyDown = (event) => {
    if (event.getModifierState) {
      setCapsLockOn(event.getModifierState('CapsLock'));
    }
  };

  const passwordHelperText = errors.password || (capsLockOn ? 'Caps Lock está ativado.' : '');

  return (
    <Guest title='Entrar'>
      <Stack spacing={{ xs: 1, sm: 1.5, md: 2.5 }} sx={{ width: '100%' }}>
        {status && (
          <Alert
            severity='success'
            sx={{
              borderRadius: 2,
              border: (theme) => `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
            }}
          >
            {status}
          </Alert>
        )}

        {denied && (
          <Alert
            severity='error'
            sx={{
              borderRadius: 2,
              border: (theme) => `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
            }}
          >
            {denied}
          </Alert>
        )}



        <form onSubmit={submit}>
          <Stack spacing={{ xs: 1, sm: 1.2, md: 2 }}>
            <TextField
              variant='outlined'
              margin='normal'
              id='email'
              name='email'
              type='email'
              label='Email'
              placeholder='seu@email.com'
              autoComplete='email'
              value={data.email}
              onChange={onHandleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={processing}
              fullWidth
              required
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'text.secondary', transition: 'all 0.2s ease-in-out' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
                  },
                  '&.Mui-focused': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03),
                    '& .MuiInputAdornment-root svg': {
                      color: 'primary.main',
                      transform: 'scale(1.1)',
                    },
                    '& fieldset': {
                      borderWidth: 2,
                    },
                  },
                },
              }}
            />

            <TextField
              variant='outlined'
              margin='normal'
              name='password'
              label='Senha'
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='••••••••'
              autoComplete='current-password'
              value={data.password}
              onChange={onHandleChange}
              error={!!errors.password}
              helperText={passwordHelperText}
              onKeyDown={handlePasswordKeyDown}
              onBlur={() => setCapsLockOn(false)}
              disabled={processing}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'text.secondary', transition: 'all 0.2s ease-in-out' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="small"
                      sx={{
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
                  },
                  '&.Mui-focused': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03),
                    '& .MuiInputAdornment-root svg': {
                      color: 'primary.main',
                      transform: 'scale(1.1)',
                    },
                    '& fieldset': {
                      borderWidth: 2,
                    },
                  },
                },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 1.5, md: 2 },
                mt: { xs: 0.5, sm: 0.75, md: 1 },
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={data.remember}
                    onChange={onHandleChange}
                    disabled={processing}
                    name='remember'
                    color='primary'
                    sx={{
                      '& .MuiSwitch-switchBase': {
                        '&.Mui-checked': {
                          color: 'primary.main',
                          '& + .MuiSwitch-track': {
                            backgroundColor: 'primary.main',
                            opacity: 0.7,
                          },
                        },
                      },
                      '& .MuiSwitch-track': {
                        borderRadius: 26 / 2,
                        backgroundColor: (theme) => alpha(theme.palette.text.secondary, 0.2),
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                      userSelect: 'none',
                    }}
                  >
                    Manter logado
                  </Typography>
                }
                sx={{
                  m: 0,
                  gap: 1,
                }}
              />

              {canResetPassword && (
                <Link
                  component={InertiaLink}
                  href={route('panel.password.request')}
                  sx={{
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      textDecoration: 'underline',
                      transform: 'translateX(2px)',
                    },
                  }}
                >
                  Esqueceu a senha?
                </Link>
              )}
            </Box>

            <Button
              variant="contained"
              color="primary"
              type='submit'
              fullWidth
              disabled={processing}
              sx={{
                py: { xs: 1.2, md: 1.5 },
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 3,
                background: (theme) => theme.palette.gradients.primary,
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: (theme) => alpha(theme.palette.primary.main, 0.5),
                },
              }}
            >
              {processing ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Entrar'
              )}
            </Button>

            <Button
              type='button'
              variant='outlined'
              startIcon={<Key />}
              fullWidth
              sx={{
                borderRadius: 3,
                py: { xs: 1, md: 1.25 },
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Entrar com chave de acesso
            </Button>
          </Stack>
        </form>

        <Paper
          variant='outlined'
          sx={{
            borderRadius: 3,
            px: { xs: 1.5, sm: 2, md: 2.5 },
            py: { xs: 1.2, sm: 1.5, md: 2 },
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
            backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.05),
          }}
        >
          <Typography variant='subtitle2' sx={{ fontWeight: 600, mb: { xs: 0.5, sm: 0.75, md: 1 }, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' } }}>
            Precisa de ajuda?
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.75, sm: 1.5, md: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
              <SupportAgent sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} color='primary' />
              <Tooltip title='Contato direto com o time de suporte.'>
                <Typography variant='body2' sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' } }}>Falar com o suporte</Typography>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
              <ChatBubbleOutline sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} color='primary' />
              <Typography variant='body2' sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' } }}>Abrir chat ao vivo</Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Guest>
  );
}
