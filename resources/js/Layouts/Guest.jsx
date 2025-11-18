import React from 'react';
import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@/Themes/ThemeContext';

const useStyles = makeStyles(theme => ({
  applicationLogo: {
    width: '4rem',
    height: '4rem',
  },
}));

const Guest = ({ title, children }) => {
  const styles = useStyles();

  return (
    <>
      <ThemeProvider>
        <Head title={title} />

        <CssBaseline />

        <Container component='main' maxWidth='xs'>
          <Grid
            container
            direction='column'
            alignItems='center'
            style={{ minHeight: '100vh', paddingTop: '3rem' }}
          >
            <ApplicationLogo className={styles.applicationLogo} />

            <Typography variant='h4'>{title}</Typography>

            {children}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Guest;
