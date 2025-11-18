import Can from "@/Components/Can";
import withAuthenticated from "@/hoc/withAuthenticated";
import DefaultPage from "@/Layouts/Components/DefaultPage";
import {useForm, usePage} from "@inertiajs/react";
import {Button, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import DefaultCard from "@/Components/DefaultCard";
import React from "react";

const Me = () => {
  const { props: { auth: { user } } } = usePage();

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

  return (
    <DefaultPage title='Meus Dados'>
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
                onChange={onInputChangeHandle}
                error={!!errors.name}
                helperText={errors.name}
                disabled={processing}
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
                onChange={onInputChangeHandle}
                error={!!errors.email}
                helperText={errors.email}
                disabled={processing}
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <TextField
                variant='outlined'
                margin='dense'
                size='small'
                id='password'
                name='password'
                type='password'
                label='Nova senha'
                autoComplete='password'
                value={data.password}
                onChange={onInputChangeHandle}
                error={!!errors.password}
                helperText={errors.password}
                disabled={processing}
                fullWidth
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                variant='outlined'
                margin='dense'
                size='small'
                id='password_confirmation'
                name='password_confirmation'
                type='password'
                label='Confirmação de senha'
                autoComplete='password_confirmation'
                value={data.password_confirmation}
                onChange={onInputChangeHandle}
                error={!!errors.password}
                disabled={processing}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container justifyContent='space-between'>
            <Grid item></Grid>
            <Grid item>
              <Can permission='update'>
                {!processing && (
                  <Button variant="contained" color="primary" type='submit'>
                    Atualizar
                  </Button>
                )}

                {processing && (
                  <CircularProgress />
                )}
              </Can>
            </Grid>
          </Grid>
        </form>
      </DefaultCard>
    </DefaultPage >
  );
};

export default withAuthenticated(Me);
