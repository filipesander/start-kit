import {usePage} from "@inertiajs/react";
import {Breadcrumbs, Typography, Box, Chip} from "@mui/material";
import { NavigateNext, Home } from "@mui/icons-material";

const getParents = (currentModule) => {
  if (!currentModule.parent) {
    return [];
  }

  return [
    ...getParents(currentModule.parent),
    currentModule.parent,
  ];
};

export default function Breadcrumb() {
  const { props: { auth: { user } } } = usePage();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
      <Home sx={{ fontSize: 18, color: 'text.secondary' }} />
      <Breadcrumbs
        separator={<NavigateNext sx={{ fontSize: 18, color: 'text.disabled' }} />}
        sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.5 } }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            '&:hover': { color: 'primary.main' }
          }}
        >
          {user.current_environment.label}
        </Typography>

        {user.current_module.parent && getParents(user.current_module).map(module => (
          <Typography
            key={`breadcrumb-module-${module.id}`}
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {module.label}
          </Typography>
        ))}

        <Chip
          label={user.current_module.label}
          size="small"
          sx={{
            height: 24,
            fontSize: '0.813rem',
            fontWeight: 600,
            background: (theme) => theme.palette.gradients.primary,
            color: '#fff',
            '& .MuiChip-label': { px: 1.5 }
          }}
        />
      </Breadcrumbs>
    </Box>
  );
}
