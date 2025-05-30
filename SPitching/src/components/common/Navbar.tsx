import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../auth/GoogleLoginButton';

const Navbar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  return (
    <header className='fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-white px-6 shadow'>
      {/* 로고 */}
      <div
        className='shimmer-wrapper text-xl font-bold text-[#255A9B]'
        onClick={() => navigate('/dashboard')}
      >
        SPitching
      </div>

      {/* 네비 메뉴 (예: 마이페이지, 설정 등) */}
      <nav className='b2 flex items-center gap-6 text-gray-700'>
        {isLoggedIn ? (
          <>
            <button
              className='transition hover:text-[#255A9B]'
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <button
              className='transition hover:text-[#255A9B]'
              onClick={() => navigate('/dashboard')}
            >
              연습 바로가기
            </button>
            <button className='transition'>환영합니다!</button>
          </>
        ) : (
          <GoogleLoginButton />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
