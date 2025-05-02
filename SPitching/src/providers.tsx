import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { PracticeCreationProvider } from '@/contexts/PracticeCreationContext';
import { store } from '@/redux/store';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <PracticeCreationProvider>{children}</PracticeCreationProvider>
    </QueryClientProvider>
  </ReduxProvider>
);
