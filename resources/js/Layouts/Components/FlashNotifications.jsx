import { usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const variantEmojis = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  default: '📢',
};

export default function FlashNotifications() {
  const { props: { flash } } = usePage();

  useEffect(() => {
    Object.entries(flash || {})
      .forEach(([variant, content]) => {
        if (!!content) {
          const emoji = variantEmojis[variant] || variantEmojis.default;
          const message = `${emoji} ${content}`;

          switch(variant) {
            case 'success':
              toast.success(message);
              break;
            case 'error':
              toast.error(message);
              break;
            case 'warning':
              toast.warning(message);
              break;
            case 'info':
              toast.info(message);
              break;
            default:
              toast(message);
          }
        }
      });
  }, [flash]);

  return (<></>);
}
