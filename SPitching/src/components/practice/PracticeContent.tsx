type PracticeContentProps = {
  currentScript: string;
  currentSlide: string; // 👉 이미지 경로
};

const PracticeContent = ({
  currentScript,
  currentSlide,
}: PracticeContentProps) => {
  return (
    <div className='flex h-full'>
      {/* 발표 슬라이드 */}
      <div className='flex w-2/3 items-center justify-center border-r border-gray-200 bg-white'>
        <img
          src={currentSlide}
          alt='슬라이드'
          className='h-[90%] w-auto object-contain'
        />
      </div>

      {/* 발표 원고 */}
      <div className='w-1/3 overflow-y-auto bg-[#F8FAF5] px-6 py-8'>
        <h2 className='s2 mb-2 text-gray-700'>발표 원고</h2>
        <p className='b2 leading-relaxed whitespace-pre-wrap text-gray-900'>
          {currentScript}
        </p>
      </div>
    </div>
  );
};
export default PracticeContent;
