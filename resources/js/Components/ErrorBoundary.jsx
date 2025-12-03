import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };

    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI error captured by ErrorBoundary:', error, errorInfo);
  }

  handleReload() {
    if (this.props.onReset) {
      this.props.onReset();
    }

    this.setState({ hasError: false, error: null });

    window.location.reload();
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const isDev = import.meta.env ? import.meta.env.DEV : false;

    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (theme) => theme.palette.background.default,
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: 480,
            width: '100%',
            p: 4,
            textAlign: 'center',
            borderRadius: 3,
          }}
        >
          <ReportProblemIcon color="warning" sx={{ fontSize: 48, mb: 2 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Oops! Algo inesperado aconteceu
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Um erro impediu que a página fosse carregada corretamente. Tente atualizar a página ou volte mais tarde.
          </Typography>

          {isDev && this.state.error && (
            <Box
              sx={{
                textAlign: 'left',
                backgroundColor: (theme) => theme.palette.action.hover,
                p: 2,
                borderRadius: 2,
                fontFamily: 'monospace',
                fontSize: 12,
                mb: 3,
                maxHeight: 200,
                overflow: 'auto',
              }}
            >
              {this.state.error?.message}
            </Box>
          )}

          <Button variant="contained" onClick={this.handleReload}>
            Recarregar página
          </Button>
        </Paper>
      </Box>
    );
  }
}

export default ErrorBoundary;
