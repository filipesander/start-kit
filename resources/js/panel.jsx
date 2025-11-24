import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { router } from '@inertiajs/react';
import PageLoader from '@/Components/PageLoader';
import { useState, useEffect } from 'react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Start Kit';

// Componente wrapper para gerenciar o loader
const AppWithLoader = ({ App, props }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => setLoading(true);
    const finishLoading = () => setLoading(false);

    router.on('start', startLoading);
    router.on('finish', finishLoading);

    return () => {
      router.off('start', startLoading);
      router.off('finish', finishLoading);
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
        <AppWithLoader App={App} props={props} />
      </ThemeContextProvider>
    );
  },
  progress: false, // Desabilita a barra de progresso padrão
});
