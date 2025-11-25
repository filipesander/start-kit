import { router } from "@inertiajs/react";
import { Button, Icon } from "@mui/material";
import React from "react";
import Can from "../Can";

export default function Edit({ environment, module, route, label, size = 'small', ...inertiaVisitProps }) {
  const handleOnClick = (event) => {
    return router.visit(route, {...inertiaVisitProps});
  }

  return (
    <Can permission='update' environment={environment} module={module}>
      <Button
        variant='contained'
        size={size}
        color='primary'
        onClick={handleOnClick}
        sx={{
          minWidth: label ? 'auto' : '36px',
          padding: label ? '6px 12px' : '6px 10px',
          '& .MuiIcon-root': {
            fontSize: '1.25rem',
          }
        }}
      >
        <Icon>edit</Icon> {label || ''}
      </Button>
    </Can>
  );
}
