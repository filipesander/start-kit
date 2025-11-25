import { router } from "@inertiajs/react";
import { Button, Icon } from "@mui/material";
import Can from "../Can";

export default function Create({ environment, module, route, label, size = 'medium', ...inertiaVisitProps }) {
  const handleOnClick = (event) => {
    return router.visit(route, {...inertiaVisitProps});
  }

  return (
    <Can permission='create' environment={environment} module={module}>
      <Button
        variant='contained'
        size={size}
        color='primary'
        onClick={handleOnClick}
        sx={{
          '& .MuiIcon-root': {
            fontSize: '1.25rem',
          }
        }}
      >
        <Icon>add</Icon> {label || ''}
      </Button>
    </Can>
  );
}
