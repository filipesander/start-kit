import Can from "@/Components/Can";
import withAuthenticated from "@/hoc/withAuthenticated";
import DefaultPage from "@/Layouts/Components/DefaultPage";
import {useForm, usePage} from "@inertiajs/react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import React, {useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Me = () => {
  const { props: { auth: { user } } } = usePage();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const { data, setData, patch, processing, errors, reset } = useForm({
    name: user.name,
    email: user.email,
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    patch(route('panel.profile.me.update'), {
      onSuccess: () => {
        reset('current_password', 'password', 'password_confirmation');
      },
    });
  };

  const onInputChangeHandle = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DefaultPage title='Meu Perfil'>
      <Grid container spacing={3}>
        {/* Card do Avatar e Informações Principais */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={3}
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" py={3}>
                <Box position="relative" mb={2}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      fontSize: '2.5rem',
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      border: '4px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }}
                  >
                    {getInitials(user.name)}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'white',
                      color: '#667eea',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                      },
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}
                    size="small"
                  >
                    <PhotoCameraIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="h5" fontWeight="600" gutterBottom align="center">
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }} align="center">
                  {user.email}
                </Typography>
                <Box mt={3} width="100%">
                  <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mb: 2 }} />
                  <Box display="flex" justifyContent="space-around">
                    <Box textAlign="center">
                      <Typography variant="h6" fontWeight="600">
                        {user.id}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        ID
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="h6" fontWeight="600">
                        Ativo
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Status
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Informações Pessoais */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <PersonIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
                <Typography variant="h6" fontWeight="600">
                  Informações Pessoais
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant='outlined'
                      size='medium'
                      id='name'
                      name='name'
                      type='text'
                      label='Nome Completo'
                      autoComplete='name'
                      value={data.name}
                      onChange={onInputChangeHandle}
                      error={!!errors.name}
                      helperText={errors.name}
                      disabled={processing}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant='outlined'
                      size='medium'
                      id='email'
                      name='email'
                      type='email'
                      label='Endereço de Email'
                      autoComplete='email'
                      value={data.email}
                      onChange={onInputChangeHandle}
                      error={!!errors.email}
                      helperText={errors.email}
                      disabled={processing}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Seção de Segurança */}
                <Box mt={5}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <LockIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
                    <Typography variant="h6" fontWeight="600">
                      Segurança
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />

                  <Typography variant="body2" color="text.secondary" mb={3}>
                    Deixe os campos em branco se não desejar alterar sua senha
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        variant='outlined'
                        size='medium'
                        id='current_password'
                        name='current_password'
                        type={showCurrentPassword ? 'text' : 'password'}
                        label='Senha Atual'
                        autoComplete='current-password'
                        value={data.current_password}
                        onChange={onInputChangeHandle}
                        error={!!errors.current_password}
                        helperText={errors.current_password}
                        disabled={processing}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                edge="end"
                                size="small"
                              >
                                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        variant='outlined'
                        size='medium'
                        id='password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        label='Nova Senha'
                        autoComplete='new-password'
                        value={data.password}
                        onChange={onInputChangeHandle}
                        error={!!errors.password}
                        helperText={errors.password}
                        disabled={processing}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        variant='outlined'
                        size='medium'
                        id='password_confirmation'
                        name='password_confirmation'
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        label='Confirmar Nova Senha'
                        autoComplete='new-password'
                        value={data.password_confirmation}
                        onChange={onInputChangeHandle}
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation}
                        disabled={processing}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                edge="end"
                                size="small"
                              >
                                {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Botões de Ação */}
                <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                  <Can permission='update'>
                    <Button
                      variant="contained"
                      color="primary"
                      type='submit'
                      size="large"
                      disabled={processing}
                      startIcon={processing ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                        '&:hover': {
                          boxShadow: '0 6px 16px rgba(102, 126, 234, 0.6)',
                        }
                      }}
                    >
                      {processing ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                  </Can>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DefaultPage>
  );
};

export default withAuthenticated(Me);
