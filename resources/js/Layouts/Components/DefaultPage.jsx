import { usePage } from "@inertiajs/react";
import { Box, Typography, alpha } from "@mui/material";
import React from "react";
import * as Unicons from "@iconscout/react-unicons";
import Breadcrumb from "@/Layouts/Components/Breadcrumb";

export default function DefaultPage({ icon, title, subtitle, actions = [], children }) {
  const {
    auth: {
      user,
    },
  } = usePage().props;
  const CustomIcon = Unicons[user.current_module.icon] ?? null;

  return (
    <>
      <Box
        sx={{
          mb: 3,
          borderRadius: 4,
          px: { xs: 2, md: 3 },
          py: { xs: 1.5, md: 2 },
          background: (theme) => alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.9 : 0.85),
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? `0 20px 60px ${alpha(theme.palette.common.black, 0.5)}`
            : `0 20px 60px ${alpha(theme.palette.primary.main, 0.15)}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.5, md: 2 },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1.5, md: 2 },
              flex: 1,
              minWidth: 0,
            }}
          >
            {(icon || CustomIcon) && (
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: (theme) => alpha(theme.palette.primary.main, 0.12),
                  border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: (theme) => theme.palette.primary.main,
                  flexShrink: 0,
                }}
              >
                {icon
                  ? icon
                  : React.createElement(CustomIcon, { size: 24 })}
              </Box>
            )}

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  mb: 1,
                  '& .MuiTypography-root': { fontSize: '0.75rem' },
                  '& .MuiChip-root': {
                    background: (theme) => alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <Breadcrumb />
              </Box>

              <Typography
                variant='h4'
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.35rem', md: '2rem' },
                  color: 'text.primary',
                  lineHeight: 1.15,
                  mb: subtitle ? 0.5 : 0,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {title || user.current_module.label}
              </Typography>
              {subtitle && (
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ fontWeight: 500 }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>

          {actions.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                '& .MuiButton-root': {
                  borderRadius: 999,
                  textTransform: 'none',
                },
              }}
            >
              {actions.map((action, index) => (
                <Box key={index}>{action}</Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      {children}
    </>
  );
}
