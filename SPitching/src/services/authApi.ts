// src/services/authApi.ts
import apiClient from './apiClient';

export const googleLogin = (googleToken: string) =>
  apiClient.post('/login', { token: googleToken });
