// src/pages/GoogleCallbackPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/services/apiClient';

const GoogleCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await apiClient.get('/api/v1/check-session');
        console.log('✅ 로그인 성공:', res.data);
        // 예: 로그인 상태 확인되면 홈으로 이동
        navigate('/');
      } catch (err) {
        console.error('❌ 로그인 실패 또는 세션 없음:', err);
        navigate('/login');
      }
    };

    checkSession();
  }, []);

  return <p>로그인 처리 중입니다...</p>;
};

export default GoogleCallbackPage;
