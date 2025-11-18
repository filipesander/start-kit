import { usePage } from "@inertiajs/react";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export default function FlashNotifications() {
  const { props: { flash } } = usePage();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    Object.entries(flash || {})
      .forEach(([variant, content]) => {
        if (!!content) {
          enqueueSnackbar(content, { variant });
        }
      });
  }, [flash]);

  return (<></>);
}
