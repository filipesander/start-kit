import { router } from "@inertiajs/react";
import { Button, Icon } from "@mui/material";
import React from "react";
import Can from "../Can";

export default function Edit({ environment, module, route, label, size, ...inertiaVisitProps }) {
  const handleOnClick = (event) => {
    return router.visit(route, {...inertiaVisitProps});
  }

  return (
    <Can permission='update' environment={environment} module={module}>
      <Button variant='contained' size={size} color='primary' onClick={handleOnClick}>
        <Icon>edit</Icon> {label || ''}
      </Button>
    </Can>
  );
}
