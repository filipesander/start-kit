import { usePage } from "@inertiajs/react";
import { Box, Typography, alpha, Card, CardContent } from "@mui/material";
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
      {/* Combined Breadcrumb + Page Header Card */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          overflow: 'visible',
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(124, 58, 237, 0.02) 0%, rgba(6, 182, 212, 0.02) 100%)',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 4px 16px rgba(0, 0, 0, 0.2)'
            : '0 2px 12px rgba(124, 58, 237, 0.08)',
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 }, '&:last-child': { pb: { xs: 2, md: 3 } } }}>
          {/* Breadcrumb */}
          <Box sx={{ mb: 2.5 }}>
            <Breadcrumb />
          </Box>

          {/* Page Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 1, md: 2 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 }, flex: 1, minWidth: 0 }}>
              {CustomIcon && (
                <Box
                  sx={{
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    borderRadius: { xs: 2, md: 2.5 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: (theme) => theme.palette.gradients.primary,
                    boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
                    flexShrink: 0,
                  }}
                >
                  {React.createElement(CustomIcon, { size: 24, color: '#fff' })}
                </Box>
              )}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1.25rem', md: '2rem' },
                    background: (theme) => theme.palette.gradients.primary,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: subtitle ? 0.5 : 0,
                    lineHeight: 1.2,
                  }}
                >
                  {title || user.current_module.label}
                </Typography>
                {subtitle && (
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                  >
                    {subtitle}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Actions */}
            {actions.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 0.75, md: 1.5 },
                  flexShrink: 0,
                  '& .MuiButton-root': {
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    padding: { xs: '6px 12px', md: '8px 16px' },
                    minWidth: { xs: 'auto', md: '64px' },
                  }
                }}
              >
                {actions.map((action, index) => (
                  <Box key={index}>{action}</Box>
                ))}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {children}
    </>
  );
}
