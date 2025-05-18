import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_API_BASE_URL + '/oauth2/authorization/google';
  };

  return (
    <header className='fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-white px-6 shadow'>
      {/* 로고 */}
      <div className='shimmer-wrapper text-xl font-bold text-[#255A9B]'>SPitching</div>

      {/* 네비 메뉴 (예: 마이페이지, 설정 등) */}
      <nav className='flex items-center gap-6 text-sm text-gray-700'>
        <button
          className='transition hover:text-[#255A9B]'
          onClick={() => navigate('/')}
        >
          홈
        </button>
        <button className='transition hover:text-[#255A9B]'>연습 바로가기</button>
        <div>
          {isLoggedIn ? (
            <button className='transition hover:text-[#255A9B]'>한서정 님</button>
          ) : (
            <button
              onClick={() => handleGoogleLogin()}
              className='transition hover:text-[#255A9B]'
            >
              로그인하기
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

// <style>
//   {`
// .shimmer-wrapper {
// position: relative;
// display: inline-block;
// overflow: hidden;
// color: #255A9B;
// }

// .shimmer-wrapper::before {
// content: '';
// position: absolute;
// top: 0;
// left: -150%;
// height: 100%;
// width: 150%;
// background: linear-gradient(
// 120deg,
// rgba(255, 255, 255, 0) 0%,
// rgba(255, 255, 255, 0.7) 50%,
// rgba(255, 255, 255, 0) 100%
// );
// animation: shimmer-move 1.8s infinite;
// transform: skewX(-20deg);
// pointer-events: none;
// }

// @keyframes shimmer-move {
// 0% {
// left: -150%;
// }
// 100% {
// left: 100%;
// }
// }
// `}
// </style>;
