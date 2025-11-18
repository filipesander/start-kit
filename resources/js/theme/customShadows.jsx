// @mui
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

const GREY = {
  500: '#919EAB',
};

const PRIMARY = { main: '#7C3AED' };
const SECONDARY = { main: '#06B6D4' };
const INFO = { main: '#3B82F6' };
const SUCCESS = { main: '#10B981' };
const WARNING = { main: '#F59E0B' };
const ERROR = { main: '#EF4444' };

export default function customShadows() {
  const color = GREY[500];
  const transparent = alpha(color, 0.16);
  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z4: `0 4px 8px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,
    //
    primary: `0 8px 16px 0 ${alpha(PRIMARY.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(INFO.main, 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(SECONDARY.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(SUCCESS.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(WARNING.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(ERROR.main, 0.24)}`,
    //
    card: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
    dialog: `-40px 40px 80px -8px ${alpha(color, 0.24)}`,
    dropdown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(color, 0.24)}`,
  };
}
