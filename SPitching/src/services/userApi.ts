// src/services/userApi.ts
//도메인 별로 userApi.ts, postApi.ts, practiceApi.ts 이런 식으로 나눔.
//✅ API 요청만 담당하는 파일 (진짜 서버랑 통신)
//에러 핸들링, 공통 설정은 Axios 인스턴스(apiClient)에서 처리

import apiClient from './apiClient';

export const getMyProfile = () => apiClient.get('/users/me');

export const login = (data: { email: string; password: string }) =>
  apiClient.post('/auth/login', data);

export const logout = () => apiClient.post('/auth/logout');
