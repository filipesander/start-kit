import {usePage} from "@inertiajs/react";
import {Breadcrumbs, Typography} from "@mui/material";

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
    <Breadcrumbs sx={{
      margin: '10px 0 30px 0'
    }}>
      <Typography color="textPrimary">{user.current_environment.label}</Typography>

      {user.current_module.parent && getParents(user.current_module).map(module => (
        <Typography color="textPrimary" key={`breadcrumb-module-${module.id}`}>{module.label}</Typography>
      ))}

      <Typography color="textPrimary">{user.current_module.label}</Typography>
    </Breadcrumbs>
  );
}
