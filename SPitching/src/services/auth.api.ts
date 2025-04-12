// src/services/authApi.ts
import apiClient from './apiClient';

export const googleLogin = (idToken: string) => {
  return apiClient.post('api/v1/login/google', { idToken }); // credentials 포함되어 있어야 함 (apiClient에서 설정)
};
