// src/pages/LoginPage.tsx
const LoginPage = () => {
  // const handleLogin = () => {
  //   window.location.href = 'https://spitching.store/login';
  // };
  const handleLogin = () => {
    // 구글 로그인 화면으로 이동시키기
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_REDIRECT_API}
		&response_type=code
		&scope=email profile`;
  };
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-4 text-xl'>로그인</h1>
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;

    if (!token) {
      console.error('No credential received');
      return;
    }

    try {
      const res = await fetch('https://spitching.store/api/v1/login/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 중요! 세션 쿠키 받기
        body: JSON.stringify({ accessToken: token }),
      });

      const data = await res.text();
      alert(data); // ex) "로그인 성공"
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
