// src/hooks/usePresentation.ts
import { useQuery } from '@tanstack/react-query';
import { getPresentationList, getRecentPractice } from '@/services/dashboard.api';

export const usePresentationList = () =>
  useQuery({ queryKey: ['presentations', 'list'], queryFn: getPresentationList });

export const useRecentPractice = () =>
  useQuery({ queryKey: ['recentPractice'], queryFn: getRecentPractice });
