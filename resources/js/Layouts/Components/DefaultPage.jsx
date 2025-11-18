import { usePage } from "@inertiajs/react";
import {Box, Card, CardContent, Grid, Icon, Typography} from "@mui/material";
import React from "react";
import * as Unicons from "@iconscout/react-unicons";
import Breadcrumb from "@/Layouts/Components/Breadcrumb";

export default function DefaultPage({ icon, title, actions = [], children }) {
  const {
    auth: {
      user,
    },
  } = usePage().props;
  const CustomIcon = Unicons[user.current_module.icon] ?? null;

  return (
    <>
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item container md={8} xs={6}>
          <Box sx={{ marginRight: '10px' }}>
            {CustomIcon && React.createElement(CustomIcon, {size: 30})}
          </Box>
          <Typography variant='h5'>{title || user.current_module.label}</Typography>
        </Grid>
        <Grid item container md={4} xs={6} justifyContent='flex-end' spacing={2}>
          {actions.length > 0 && actions.map((action, index) => (
            <Grid item key={index}>{action}</Grid>
          ))}
        </Grid>
      </Grid>

      <Breadcrumb />

      {children}
    </>
  );
}
