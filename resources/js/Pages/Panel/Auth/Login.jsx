import React, { useEffect } from 'react';
import { Link as InertiaLink, useForm } from '@inertiajs/react';
import Guest from '@/Layouts/Guest';
import { Button, Checkbox, CircularProgress, FormControlLabel, Grid, Link, TextField } from '@mui/material';
import { Alert } from '@mui/material';

export default function Login({ status, denied, canResetPassword }) {
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

  return (
    <Guest title='Entrar'>
      {status && <Alert severity='success'>{status}</Alert>}
      {denied && <Alert severity='error'>{denied}</Alert>}

      <form onSubmit={submit} style={{ width: '100%' }}>
        <TextField
          variant='outlined'
          margin='normal'
          id='email'
          name='email'
          type='email'
          label='Email'
          autoComplete='email'
          value={data.email}
          onChange={onHandleChange}
          error={!!errors.email}
          helperText={errors.email}
          disabled={processing}
          fullWidth
          required
          autoFocus
        />

        <TextField
          variant='outlined'
          margin='normal'
          name='password'
          label='Senha'
          type='password'
          id='password'
          autoComplete='current-password'
          value={data.password}
          onChange={onHandleChange}
          error={!!errors.password}
          helperText={errors.password}
          disabled={processing}
          required
          fullWidth
        />

        <FormControlLabel
          label='Manter logado'
          control={
            <Checkbox
              value='remember'
              color='primary'
              checked={data.remember}
              onChange={onHandleChange}
              disabled={processing}
            />
          }
        />

        <Grid container justifyContent='space-between'>
          {canResetPassword && (
            <Link component={InertiaLink} href={route('panel.password.request')}>
              Esqueceu a senha?
            </Link>
          )}

          {!processing && (
            <Button variant="contained" color="primary" type='submit'>
              Entrar
            </Button>
          )}

          {processing && (
            <CircularProgress />
          )}
        </Grid>
      </form>
    </Guest>
  );
}
