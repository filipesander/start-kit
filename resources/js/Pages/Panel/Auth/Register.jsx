import React, { useEffect } from 'react';
import Guest from '@/Layouts/Guest';
import { useForm } from '@inertiajs/react';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('panel.register'));
  };

  return (
    <Guest title='Registro'>
      <form onSubmit={submit} style={{ width: '100%' }}>
        <TextField
          variant='outlined'
          margin='normal'
          id='name'
          name='name'
          type='text'
          label='Nome'
          autoComplete='name'
          value={data.name}
          onChange={onHandleChange}
          error={!!errors.name}
          helperText={errors.name}
          disabled={processing}
          fullWidth
          required
          autoFocus
        />

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
          autoComplete='new-password'
          value={data.password}
          onChange={onHandleChange}
          error={!!errors.password}
          helperText={errors.password}
          disabled={processing}
          required
          fullWidth
        />

        <TextField
          variant='outlined'
          margin='normal'
          name='password_confirmation'
          label='Confirme a senha'
          type='password'
          id='password_confirmation'
          autoComplete='new-password'
          value={data.password_confirmation}
          onChange={onHandleChange}
          error={!!errors.password_confirmation}
          helperText={errors.password_confirmation}
          disabled={processing}
          required
          fullWidth
        />

        <Grid container justifyContent='flex-end'>
          {!processing && (
            <Button variant="contained" color="primary" type='submit'>
              Registrar
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
