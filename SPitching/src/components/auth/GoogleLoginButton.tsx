import GoogleLoginIcon from '@/assets/GoogleLoginIcon.svg?react';
const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_API_BASE_URL + '/oauth2/authorization/google';
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className='flex items-center gap-2 rounded-lg bg-gray-200 px-5 py-2 shadow transition hover:shadow-md'
    >
      <GoogleLoginIcon className='h-6 w-6' />
      <span className='text-base font-medium text-[#5A5F5C]'>Google로 로그인</span>
    </button>
  );
};

export default GoogleLoginButton;
