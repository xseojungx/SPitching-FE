// src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.spitching.store',
  withCredentials: true, // 세션 쿠키 포함
  headers: { 'Content-Type': 'application/json' },
});

// 공통 응답 에러 처리
apiClient.interceptors.response.use(
  (response) => response, // 또는 response.data 로도 설정 가능
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default apiClient;
