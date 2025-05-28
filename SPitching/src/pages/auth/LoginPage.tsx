// src/pages/LoginPage.tsx
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import Navbar from '@/components/common/Navbar';

const LoginPage = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <Navbar />
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
