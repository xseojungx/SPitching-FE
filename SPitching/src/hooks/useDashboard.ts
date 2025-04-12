// src/hooks/usePresentation.ts
import { useQuery } from '@tanstack/react-query';
import { getPresentationList } from '@/services/dashboard.api';

export const usePresentationList = () =>
  useQuery({
    queryKey: ['presentations', 'list'],
    queryFn: getPresentationList,
  });
