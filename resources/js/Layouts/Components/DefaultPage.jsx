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
      <Breadcrumb />

      {/* Page Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
          pb: 3,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {CustomIcon && (
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: (theme) => theme.palette.gradients.primary,
                boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              {React.createElement(CustomIcon, { size: 26, color: '#fff' })}
            </Box>
          )}
          <Box>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 800,
                background: (theme) => theme.palette.gradients.primary,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: subtitle ? 0.5 : 0,
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

        {/* Actions */}
        {actions.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {actions.map((action, index) => (
              <Box key={index}>{action}</Box>
            ))}
          </Box>
        )}
      </Box>

      {children}
    </>
  );
}
