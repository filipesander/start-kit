import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const Loader = ({
  size = 40,
  thickness = 4,
  color = 'primary',
  fullscreen = false,
  sx = {}
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (fullscreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark
            ? 'rgba(15, 23, 42, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(4px)',
          zIndex: 1300,
          ...sx,
        }}
      >
        <CircularProgress
          size={size}
          thickness={thickness}
          color={color}
          sx={{
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <CircularProgress
        size={size}
        thickness={thickness}
        color={color}
        sx={{
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
    </Box>
  );
};

export default Loader;
