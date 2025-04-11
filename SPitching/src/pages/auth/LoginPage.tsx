// src/pages/LoginPage.tsx
const LoginPage = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-4 text-xl'>로그인</h1>
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    console.log('토큰', token);

    if (!token) {
      console.error('No credential received');
      return;
    }

    try {
      const res = await fetch('https://spitching.store/api/v1/login/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 중요! 세션 쿠키 받기
        body: JSON.stringify({ idToken: token }),
      });

      const data = await res.text();
      alert(data); // ex) "로그인 성공"
      navigate('/dashboard'); // 예시
    } catch (err) {
      console.error('로그인 실패', err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
    />
  );
};
