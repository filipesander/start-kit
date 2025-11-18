import Fallback from "@/Layouts/Components/Fallback";
import { lazy, Suspense } from "react";
const Authenticated = lazy(() => import('@/Layouts/Authenticated'));

export default function withAuthenticated(PageComponent) {
  return function Wrap(props) {
    return (
      <Suspense fallback={<Fallback width='100%' height='100vh' />}>
        <Authenticated>
          <PageComponent {...props} />
        </Authenticated>
      </Suspense>
    );
  };
}
