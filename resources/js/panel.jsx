import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeContextProvider } from '@/contexts/ThemeContext';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/Panel/${name}.jsx`, import.meta.glob('./Pages/Panel/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ThemeContextProvider>
        <App {...props} />
      </ThemeContextProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
