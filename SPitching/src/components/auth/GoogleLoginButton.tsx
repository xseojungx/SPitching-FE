// // src/components/GoogleLoginButton.tsx
// import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';
// import { googleLogin } from '@/services/auth.api';

// import { useDispatch } from 'react-redux';
// import { login } from '@/redux/slices/auth.slice';

const GoogleLoginButton = () => {
  // const navigate = useNavigate();

  // const dispatch = useDispatch();

  // const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
  //   const token = credentialResponse.credential;

  //   if (!token) {
  //     console.error('❌ Google ID Token 없음');
  //     return;
  //   }

  //   try {
  //     const res = await googleLogin(token); // ✅ 서비스 레이어에서 API 호출
  //     alert(res.data); // 예: "로그인 성공"
  //     dispatch(login());
  //     navigate('/dashboard');
  //   } catch (err) {
  //     console.error('❌ 로그인 실패:', err);
  //   }
  // };
  const handleGoogleLogin = () => {
    window.location.href = 'https://api.spitching.store/oauth2/authorization/google';
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
