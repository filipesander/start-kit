import Can from "@/Components/Can";
import withAuthenticated from "@/hoc/withAuthenticated";
import DefaultErrorAlert from "@/Layouts/Components/DefaultErrorAlert";
import DefaultPage from "@/Layouts/Components/DefaultPage";
import http from "@/Libs/Http";
import { Link as InertiaLink, useForm } from "@inertiajs/react";
import { Button, Checkbox, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete } from '@mui/material';
import React, { useState } from "react";
import DefaultCard from "@/Components/DefaultCard";

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
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                variant='outlined'
                margin='dense'
                size='small'
                id='name'
                name='name'
                type='text'
                label='Nome'
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
                margin='dense'
                size='small'
                id='email'
                name='email'
                type='email'
                label='Email'
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

          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <TextField
                variant='outlined'
                margin='dense'
                size='small'
                name='password'
                label='Senha'
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
                margin='dense'
                size='small'
                name='password_confirmation'
                label='Confirme a senha'
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
                margin='dense'
                size='small'
                name='auth_password'
                label='Sua Senha'
                type='password'
                id='auth_password'
                autoComplete='current-password'
                value={data.auth_password}
                onChange={onHandleInputChange}
                error={!!errors.auth_password}
                helperText={errors.auth_password}
                disabled={processing}
                required={!data.id || !!data.password}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <FormControl
                variant='outlined'
                error={!!errors.role}
                fullWidth
                margin='dense'
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
            <Grid item md={5} xs={12}>
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
                    label='Grupos'
                    placeholder='Grupos'
                    margin='dense'
                  />
                )}
                size='small'
              />
            </Grid>
          </Grid>

          <br />

          <Grid container justifyContent='space-between' alignItems='center' spacing={2}>
            <Grid item md={9} xs={12}>
              <Button color='inherit' variant='contained' component={InertiaLink} href={route('panel.main.users.index')}>
                Voltar
              </Button>
            </Grid>
            <Grid
              container
              item
              md={3}
              xs={12}
              spacing={1}
              justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
              sx={{ mt: { xs: 1, md: 0 } }}
            >
              {data.id && (
                <Grid item>
                  <Reset2FA user={user} />
                </Grid>
              )}
              <Can permission={`${data.id ? 'update' : 'create'}`}>
                {!isReadOnly && (
                  <Grid item>
                    {!processing && (
                      <Button variant="contained" color="primary" type='submit'>
                        {data.id ? 'Atualizar' : 'Registrar'}
                      </Button>
                    )}

                    {processing && (
                      <CircularProgress />
                    )}
                  </Grid>
                )}
              </Can>
            </Grid>
          </Grid>
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

  if (reseting) {
    return (
      <CircularProgress color='secondary' />
    );
  }

  return (
    <>
      {error && (
        <DefaultErrorAlert
          error={error}
          onClose={() => setError(null)}
        />
      )}

      <Can permission='update'>
        <Button variant='contained' color='secondary' onClick={handleOnClick}>
          Resetar 2FA
        </Button>
      </Can>
    </>
  );
}
