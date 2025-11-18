import withAuthenticated from "@/hoc/withAuthenticated";
import DefaultPage from "@/Layouts/Components/DefaultPage";
import { useForm } from "@inertiajs/react";
import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import DefaultCard from "@/Components/DefaultCard";

const Otp = ({ name, secret, qrCode, signature }) => {
  const { data, setData, patch, processing, errors, reset } = useForm({
    secret,
    qrCode,
    signature,
    code: '',
  });

  const onHandleInputChange = (event) => {
    setData(event.target.name, event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    patch(route('panel.profile.otp.update'), {
      preserveState: true,
    });
  }

  return (
    <DefaultPage title='Autenticação de 2 Fatores'>
      <DefaultCard>
        <Typography variant='body1' component='p'>
          <strong>É obrigatório habilitar a autenticação de 2 fatores!</strong>
        </Typography>
        <Typography variant='body1' component='p'>
          Escaneie o QR Code abaixo com um aplicativo de <strong>Autenticação de 2 Fatores</strong> para configurar.
        </Typography>
        <Typography variant='body1' component='p'>
          Nós sugerimos o uso do <strong>Google Authenticator</strong> ou <strong>Twilio Authy 2-Factor Authentication</strong>, mas pode utilizar o app de sua preferência.
        </Typography>
        <Typography variant='body1' component='p'>
          Toda vez que fizer login, será nessário informar o código apresentado no aplicativo.
        </Typography>
        <Typography variant='body1' component='p'>
          <strong>Após ter escaneado o QR Code e feito a configuração no aplicativo, informe o código de 6 dígitos no campo abaixo do QR Code.</strong>
        </Typography>
        <br />
        <Typography variant='body1' component='p'>
          Se não for possível escanear o QR Code, configure com este código: <strong>{data.secret}</strong>
        </Typography>

        <img key={data.signature} src={data.qrCode} width='250' />

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <TextField
                variant='outlined'
                size='small'
                margin='normal'
                id='code'
                name='code'
                type='text'
                label='Código'
                autoComplete='off'
                value={data.code}
                onChange={onHandleInputChange}
                error={!!errors.code}
                helperText={errors.code}
                disabled={processing}
                inputProps={{
                  maxLength: 6,
                  minLength: 6,
                }}
                fullWidth
                required
                autoFocus
              />
            </Grid>
            <Grid item md={12}>
              {!processing && (
                <Button variant="contained" color="primary" type='submit'>Verificar</Button>
              )}

              {processing && (
                <CircularProgress />
              )}
            </Grid>
          </Grid>
        </form>
      </DefaultCard>
    </DefaultPage>
  );
};

export default withAuthenticated(Otp);
