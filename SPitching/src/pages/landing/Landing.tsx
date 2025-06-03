// src/pages/LandingPage.tsx
import Navbar from '@/components/common/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import Gesture from '@/assets/gesture_landing.png';
import Eyecontact from '@/assets/eyecontact_landing.png';
export default function Landing() {
  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_API_BASE_URL + '/oauth2/authorization/google';
  };
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-br from-[#FFFFFF] via-[#A9EAD6] to-[#F8FAF5] text-[#5A5F5C]'>
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <main className='flex flex-grow flex-col items-center justify-center px-6 text-center'>
        <h2 className='mb-4 text-4xl font-extrabold text-black'>발표 연습을 위한 AI 트레이닝</h2>
        <p className='mb-6 max-w-2xl text-lg'>
          실시간 시선 추적과 제스처 분석으로 자신감을 높이는 발표 연습 한 번에 완성
        </p>
        {isLoggedIn ? (
          <span
            onClick={() => navigate('/dashboard')}
            className='rounded-lg bg-[#255A9B] px-8 py-3 text-lg font-semibold text-white transition hover:bg-[#1A3D6F]'
          >
            대시보드로 이동
          </span>
        ) : (
          <span
            onClick={handleGoogleLogin}
            className='rounded-lg bg-[#4C9ACF] px-8 py-3 text-lg font-semibold text-white transition hover:bg-[#255A9B]'
          >
            지금 시작하기
          </span>
        )}
      </main>

      {/* Features Section */}
      <section className='bg-neutral-50/70 py-16'>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-3'>
          <div className='flex flex-col items-center'>
            {/* <img
              src={Eyecontact}
              alt='시선 추적'
              className='mb-4 h-40'
            /> */}
            <h3 className='mb-2 text-xl font-semibold'>시선 추적 피드백</h3>
            <p className='text-center text-base'>발표 중 시선 분포 분석으로 시청자 집중 유도</p>
          </div>

          <div className='flex flex-col items-center'>
            {/* <img
              src={Gesture}
              alt='제스처 인식'
              className='mb-4 h-16'
            /> */}
            <h3 className='mb-2 text-xl font-semibold'>제스처 인식 피드백</h3>
            <p className='text-center text-base'>핸드 제스처 분석으로 자연스러운 동작 완성</p>
          </div>

          <div className='flex flex-col items-center'>
            {/* <img
              src='/images/fluency.svg'
              alt='음성 유창성'
              className='mb-4 h-16'
            /> */}
            <h3 className='mb-2 text-xl font-semibold'>유창성 분석</h3>
            <p className='text-center text-base'>발음과 속도 검토로 매끄러운 전달</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-6 text-center text-sm text-[#5A5F5C]'>
        <p>© 2025 SPitching AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
