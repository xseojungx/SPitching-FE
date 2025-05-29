import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RootApp from './App.tsx';
import { AppProviders } from './providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RootApp />
    </AppProviders>
  </StrictMode>,
);
