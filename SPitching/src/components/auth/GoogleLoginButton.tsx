const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_API_BASE_URL + '/oauth2/authorization/google';
  };

  return (
    // <GoogleLogin
    //   onSuccess={handleLoginSuccess}
    //   onError={() => console.log('❌ Google 로그인 실패')}
    //   useOneTap
    // />
    <button
      className='h-10 w-10 bg-amber-300'
      onClick={() => handleGoogleLogin()}
    />
  );
};

export default GoogleLoginButton;
