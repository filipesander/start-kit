import { createTheme } from "@mui/material";
import { ptBR } from '@mui/material/locale';
import { ptBR as DataGridPtBr } from '@mui/x-data-grid';

export default createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2c3e50',
      contrastText: '#fff',
    },
    secondary: {
      main: '#95a5a6',
      contrastText: '#fff',
    },
    success: {
      main: '#18bc9c',
      contrastText: '#fff',
    },
    info: {
      main: '#3498db',
      contrastText: '#fff',
    },
    warning: {
      main: '#f39c12',
      contrastText: '#fff',
    },
    error: {
      main: '#e74c3c',
      contrastText: '#fff',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        color: '#18bc9c',
      },
    },
  },
}, ptBR, DataGridPtBr);
