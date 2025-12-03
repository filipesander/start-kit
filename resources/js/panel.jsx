import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { router } from '@inertiajs/react';
import PageLoader from '@/Components/PageLoader';
import ErrorBoundary from '@/Components/ErrorBoundary';
import { useState, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Start Kit';

// Componente wrapper para gerenciar o loader
const AppWithLoader = ({ App, props }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => setLoading(true);
    const finishLoading = () => setLoading(false);

    const removeStartListener = router.on('start', startLoading);
    const removeFinishListener = router.on('finish', finishLoading);

    return () => {
      removeStartListener();
      removeFinishListener();
    };
  }, []);

  return (
    <>
      <PageLoader show={loading} />
      <App {...props} />
    </>
  );
};

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/Panel/${name}.jsx`, import.meta.glob('./Pages/Panel/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ThemeContextProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={3000}
        >
          <ErrorBoundary>
            <AppWithLoader App={App} props={props} />
          </ErrorBoundary>
        </SnackbarProvider>
      </ThemeContextProvider>
    );
  },
  progress: false, // Desabilita a barra de progresso padrão
});
