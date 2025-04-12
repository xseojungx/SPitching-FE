// src/pages/LoginPage.tsx
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

const LoginPage = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-4 text-xl'>로그인</h1>
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
