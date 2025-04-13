// src/components/common/LoadingOverlay.tsx

const LoadingOverlay = () => {
  return (
    <div className='bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-sm'>
      <div className='animate-pulse text-xl font-semibold text-gray-700'>
        제스처 분석 중입니다...
      </div>
    </div>
  );
};

export default LoadingOverlay;
