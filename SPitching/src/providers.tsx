import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { PracticeCreationProvider } from '@/contexts/PracticeCreationContext';
import { QueryClient } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/redux/store';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <PracticeCreationProvider>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          {children}
        </PersistGate>
      </PracticeCreationProvider>
    </QueryClientProvider>
  </ReduxProvider>
);
