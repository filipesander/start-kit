import React, { useEffect } from 'react';
import Guest from '@/Layouts/Guest';
import { useForm } from '@inertiajs/react';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('panel.password.confirm'));
  };

  return (
    <Guest title='Confirmar Senha'>
      <div>
        Esta é uma área segura da aplicação. Por favor, confirme sua senha antes de continuar.
      </div>

      <form onSubmit={submit} style={{ width: '100%' }}>
        <TextField
          variant='outlined'
          margin='normal'
          name='password'
          label='Password'
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

        <Grid container justifyContent='flex-end'>
          {!processing && (
            <Button variant="contained" color="primary" type='submit'>
              Confirmar
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
