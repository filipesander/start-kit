import React from 'react';
import Guest from '@/Layouts/Guest';
import { useForm } from '@inertiajs/react';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { Alert } from '@mui/material';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('panel.password.email'));
  };

  return (
    <Guest title='Esqueci minha senha'>
      <div>
        Esqueceu sua senha? Sem problemas. É só nos informar o seu e-mail que nós enviaremos
        para você um link para redefinição de senha que irá permitir que você escolha uma nova senha.
      </div>

      {status && <Alert severity='success'>{status}</Alert>}

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

        <Grid container justifyContent='flex-end'>
          {!processing && (
            <Button variant="contained" color="primary" type='submit'>
              Enviar link de redefinição de senha
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
