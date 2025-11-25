import Can from "@/Components/Can";
import withAuthenticated from "@/hoc/withAuthenticated";
import DefaultErrorAlert from "@/Layouts/Components/DefaultErrorAlert";
import DefaultPage from "@/Layouts/Components/DefaultPage";
import http from "@/Libs/Http";
import { Link as InertiaLink, useForm } from "@inertiajs/react";
import { Button, Checkbox, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography, Box, Divider, alpha } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete } from '@mui/material';
import React, { useState } from "react";
import DefaultCard from "@/Components/DefaultCard";
import * as Unicons from '@iconscout/react-unicons';

const Edit = ({ user, roles, groups, isReadOnly }) => {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    id: null,
    name: '',
    email: '',
    role: 0,
    password: '',
    password_confirmation: '',
    auth_password: '',
    ...(user || {}),
    groups: user ? user.groups.map(group => group.id) : [],
  });

  const onHandleInputChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.id) {
      put(route('panel.main.users.update', [data.id]));
    } else {
      post(route('panel.main.users.store'));
    }
  };

  const getTitle = () => {
    if (data.id === null) {
      return 'Registrar Usuário';
    }

    if (isReadOnly) {
      return `Usuário #${data.id}`;
    }

    return `Atualizar Usuário #${data.id}`;
  };

  const handleGroupsChange = (event, selectedGroups) => {
    setData({
      ...data,
      groups: selectedGroups.map(group => group.id),
    });
  };

  console.log(groups);

  return (
    <DefaultPage title={getTitle()}>
      <DefaultCard>
        <form onSubmit={handleSubmit}>
          {/* Seção: Informações Pessoais */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: (theme) => alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main'
                }}
              >
                <Unicons.UilUser size={18} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Informações Pessoais
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  variant='outlined'
                  size='small'
                  id='name'
                  name='name'
                  type='text'
                  label='Nome Completo'
                  autoComplete='name'
                  value={data.name}
                  onChange={onHandleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  disabled={processing}
                  inputProps={{ readOnly: isReadOnly }}
                  fullWidth
                  required
                  autoFocus
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  variant='outlined'
                  size='small'
                  id='email'
                  name='email'
                  type='email'
                  label='Endereço de Email'
                  autoComplete='email'
                  value={data.email}
                  onChange={onHandleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={processing}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Seção: Segurança */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: (theme) => alpha(theme.palette.warning.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'warning.main'
                }}
              >
                <Unicons.UilLock size={18} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Segurança
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {data.id ? 'Deixe em branco para manter a senha atual' : 'Crie uma senha segura'}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <TextField
                  variant='outlined'
                  size='small'
                  name='password'
                  label='Nova Senha'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  value={data.password}
                  onChange={onHandleInputChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  disabled={processing}
                  required={!data.id}
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  variant='outlined'
                  size='small'
                  name='password_confirmation'
                  label='Confirmar Nova Senha'
                  type='password'
                  id='password_confirmation'
                  autoComplete='new-password'
                  value={data.password_confirmation}
                  onChange={onHandleInputChange}
                  error={!!errors.password_confirmation}
                  helperText={errors.password_confirmation}
                  disabled={processing}
                  required={!data.id}
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  variant='outlined'
                  size='small'
                  name='auth_password'
                  label='Sua Senha Atual'
                  type='password'
                  id='auth_password'
                  autoComplete='current-password'
                  value={data.auth_password}
                  onChange={onHandleInputChange}
                  error={!!errors.auth_password}
                  helperText={errors.auth_password || 'Para confirmar as alterações'}
                  disabled={processing}
                  required={!data.id || !!data.password}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Seção: Permissões */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: (theme) => alpha(theme.palette.success.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'success.main'
                }}
              >
                <Unicons.UilShieldCheck size={18} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Permissões e Grupos
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <FormControl
                  variant='outlined'
                  error={!!errors.role}
                  fullWidth
                  size='small'
                >
                  <InputLabel id='form-user-role-label'>Cargo</InputLabel>
                  <Select
                    labelId='form-user-role-label'
                    id='form-user-role'
                    value={data.role}
                    onChange={onHandleInputChange}
                    label='Cargo'
                    name='role'
                  >
                    {Object.entries(roles).map(([value, label]) => (
                      <MenuItem key={value} value={value}>{label}</MenuItem>
                    ))}
                  </Select>
                  {!!errors.role && (
                    <FormHelperText>{errors.role}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item md={8} xs={12}>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  fullWidth
                  filterSelectedOptions
                  id='form-user-groups'
                  options={groups}
                  defaultValue={groups.filter(group => data.groups.includes(group.id))}
                  onChange={handleGroupsChange}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option) => data.groups.includes(option.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      label='Grupos de Acesso'
                      placeholder='Selecione os grupos'
                      size='small'
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Seção: Ações */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              pt: 1
            }}
          >
            <Button
              color='inherit'
              variant='outlined'
              component={InertiaLink}
              href={route('panel.main.users.index')}
              startIcon={<Unicons.UilArrowLeft size={18} />}
            >
              Voltar
            </Button>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {data.id && (
                <Reset2FA user={user} />
              )}
              <Can permission={`${data.id ? 'update' : 'create'}`}>
                {!isReadOnly && (
                  <>
                    {!processing && (
                      <Button
                        variant="contained"
                        color="primary"
                        type='submit'
                        startIcon={data.id ? <Unicons.UilCheck size={18} /> : <Unicons.UilPlus size={18} />}
                      >
                        {data.id ? 'Salvar Alterações' : 'Criar Usuário'}
                      </Button>
                    )}

                    {processing && (
                      <Button
                        variant="contained"
                        disabled
                      >
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Processando...
                      </Button>
                    )}
                  </>
                )}
              </Can>
            </Box>
          </Box>
        </form>
      </DefaultCard>
    </DefaultPage>
  );
};

export default withAuthenticated(Edit);

const Reset2FA = ({ user }) => {
  const [reseting, setReseting] = useState(false);
  const [error, setError] = useState(null);

  const handleOnClick = async (e) => {
    try {
      setReseting(true);
      await http.put(route('panel.main.users.reset-2fa', [user.id]));
    } catch (error) {
      setError(error);
    } finally {
      setReseting(false);
    }
  };

  return (
    <>
      {error && (
        <DefaultErrorAlert
          error={error}
          onClose={() => setError(null)}
        />
      )}

      <Can permission='update'>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleOnClick}
          disabled={reseting}
          startIcon={reseting ? <CircularProgress size={18} /> : <Unicons.UilSync size={18} />}
        >
          {reseting ? 'Resetando...' : 'Resetar 2FA'}
        </Button>
      </Can>
    </>
  );
}
