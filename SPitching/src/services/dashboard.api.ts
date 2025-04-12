import apiClient from './apiClient';

export interface Presentation {
  id: number;
  title: string;
  description: string;
  practice_count: number;
}

export const getPresentationList = () =>
  apiClient.get<Presentation[]>('api/v1/presentations/list');
