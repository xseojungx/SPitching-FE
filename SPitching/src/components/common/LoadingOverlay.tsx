const LoadingOverlay = () => {
  const text = '분석 중입니다...';

  return (
    <>
      <div className='bg-opacity-70 fixed inset-0 z-2 flex items-center justify-center bg-gray-700/20 backdrop-blur-sm'>
        <div className='flex text-3xl font-semibold text-white'>
          {text.split('').map((char, index) => (
            <span
              key={index}
              className='wave-letter'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* 👇 컴포넌트 로컬 스타일 */}
      <style>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .wave-letter {
          display: inline-block;
          animation: wave 1s ease-in-out infinite;
          letter-spacing: 0.05em; /* 자간 살짝 넓힘 */
          margin-right: 0.05em;    /* 글자 간격 부드럽게 */
        }
      `}</style>
    </>
  );
};

export default LoadingOverlay;
