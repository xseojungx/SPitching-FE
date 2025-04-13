// src/components/common/LoadingOverlay.tsx

const LoadingOverlay = () => {
  return (
    <div className='bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-gray-700/20 backdrop-blur-sm'>
      <div className='h1 animate-pulse font-semibold text-white'>
        분석 중입니다...
      </div>
    </div>
  );
};

export default LoadingOverlay;
