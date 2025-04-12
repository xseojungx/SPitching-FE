import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 환경변수로 설정
  withCredentials: true, // 세션 쿠키
  headers: { 'Content-Type': 'application/json' },
});

// 공통 인터셉터 설정 (토큰 추가, 에러 처리 등)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default apiClient;
