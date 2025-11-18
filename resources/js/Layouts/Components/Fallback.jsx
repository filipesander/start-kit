import React from "react";
import { CircularProgress, Grid } from "@mui/material";

export default function Fallback({ width, height }) {
  return (
    <>
      <Grid container justifyContent='center' alignItems='center' style={{ width, height }}>
        <CircularProgress />
      </Grid>
    </>
  )
};
