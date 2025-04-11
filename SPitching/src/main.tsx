import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId=''>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>,
);
