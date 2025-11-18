import { usePage } from "@inertiajs/react";

export default function Can({ permission, environment, module, children }) {
  const {
    props: {
      auth: {
        user,
      },
    },
  } = usePage();

  const environmentToCheck = environment || user.current_environment.slug;
  const moduleToCheck = module || user.current_module.slug;

  if (typeof environmentToCheck === 'undefined' || ! environmentToCheck) {
    return (<></>);
  }

  if (typeof moduleToCheck === 'undefined' || ! moduleToCheck) {
    return (<></>);
  }

  const denied = user.permissions[environmentToCheck][moduleToCheck][permission] !== 1
    && user.permissions[environmentToCheck][moduleToCheck][permission] !== true;

  if (denied) {
    return (<></>);
  }

  return children;
}
