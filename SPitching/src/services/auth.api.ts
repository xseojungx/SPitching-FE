import apiClient from './apiClient';

export const getSessionStatus = () => {
  return apiClient.get('api/v1/session/status'); // credentials 포함되어 있어야 함 (apiClient에서 설정)
};

export const getUserId = () => {
  return apiClient.get('api/v1/session/user/id'); // credentials 포함되어 있어야 함 (apiClient에서 설정)
};

// 로그아웃 처리
export const postLogout = () => {
  return apiClient.post('/api/v1/logout');
};
