import { usePage } from "@inertiajs/react";

export default function Can({ permission, environment, module, children }) {
  const {
    props: {
      auth: {
        user,
      },
    },
  } = usePage();

  const environmentToCheck = environment ?? user?.current_environment?.slug;
  const moduleToCheck = module ?? user?.current_module?.slug;

  if (!environmentToCheck || !moduleToCheck) {
    return (<></>);
  }

  const modulePermissions = user?.permissions?.[environmentToCheck]?.[moduleToCheck];

  if (!modulePermissions) {
    return (<></>);
  }

  const allowed = modulePermissions[permission] === 1 || modulePermissions[permission] === true;

  if (!allowed) {
    return (<></>);
  }

  return children;
}
