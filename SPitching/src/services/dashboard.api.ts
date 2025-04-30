import apiClient from './apiClient';

export interface Presentation {
  title: string;
  description: string;
  practiceCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export const getPresentationList = () => apiClient.get('/api/v1/presentations/list');
// export const getPresentationList = async () => {
//   const res = await apiClient.get('/api/v1/presentations/list');
//   console.log('res',res)
//   return res.data; // ✅ 실제 데이터만 반환
// };
