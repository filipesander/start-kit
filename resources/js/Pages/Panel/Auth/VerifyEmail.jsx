import React from 'react';
import Guest from '@/Layouts/Guest';
import { Link, useForm } from '@inertiajs/react';
import { Alert } from '@mui/material';
import { Button, Grid } from '@mui/material';

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm();

  const submit = (e) => {
    e.preventDefault();

    post(route('panel.verification.send'));
  };

  return (
    <Guest title='Verificação de Email'>
      <div>
        Obrigado por se registar! Antes de começar, confirme o seu endereço de e-mail clicando no link presente no e-mail que acabamos de te enviar!
        Caso não tenha recebido o email, teremos o maior prazer em reenviar-lhe outro.
      </div>

      {status === 'verification-link-sent' && (
        <Alert severity='success'>
          Um novo link de verificação foi enviado para o endereço de e-mail que você forneceu durante o processo de cadastro.
        </Alert>
      )}

      <form onSubmit={submit}>
        <Grid container direction='column' justifyContent='space-between' alignItems='center'>
          <Button variant='contained' color='primary' type='submit'>
            Enviar novamente o e-mail de verificação
          </Button>
          <br />
          <Link href={route('panel.logout')} method='post' className='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary'>
            Sair
          </Link>
        </Grid>
      </form>
    </Guest>
  );
}
