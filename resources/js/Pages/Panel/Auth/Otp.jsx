import Guest from "@/Layouts/Guest";
import { useForm } from "@inertiajs/react";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";

export default function Otp({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    code: '',
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

    post(route('panel.otp.store'));
  };

  return (
    <Guest title='2FA'>
      <form onSubmit={submit} style={{ width: '100%' }}>
        <TextField
          variant='outlined'
          margin='normal'
          id='code'
          name='code'
          type='text'
          label='Código'
          autoComplete='off'
          value={data.code}
          onChange={onHandleChange}
          error={!!errors.code}
          helperText={errors.code}
          disabled={processing}
          fullWidth
          required
          autoFocus
        />

        <Grid container justifyContent='flex-end'>
          {!processing && (
            <Button variant="contained" color="primary" type='submit'>
              Verificar
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
