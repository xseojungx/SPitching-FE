// src/components/practice/ScriptViewer.tsx
import { UploadSlidesResponse } from '@/types/presentation.types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScriptViewer = ({
  slideList,
  currentIndex,
  onPrev,
  onNext,
}: {
  slideList: UploadSlidesResponse;
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const currentSlide = slideList?.[currentIndex];
  const nextSlide = slideList?.[currentIndex + 1];
  if (!currentSlide) return null;

  return (
    <div className='bg-box-white shadow-navy-700 relative mt-8 flex max-h-80 min-h-[160px] w-full justify-center overflow-auto border-t border-[rgba(64,80,98,0.60)] px-[10vw] py-4 shadow-xl'>
      {/* 좌우 화살표 */}
      <button
        className='bg-navy-700 hover:bg-navy-600 absolute top-1/2 left-4 -translate-y-1/2 rounded-full p-2 text-white shadow'
        onClick={onPrev}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        className='bg-navy-700 hover:bg-navy-600 absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-2 text-white shadow'
        onClick={onNext}
        disabled={currentIndex === slideList.length - 1}
      >
        <ChevronRight size={20} />
      </button>

      {/* 콘텐츠 wrapper */}
      <div className='flex w-full gap-6'>
        {/* 스크립트 영역 */}
        <div className='flex-1 overflow-auto pr-4 leading-relaxed text-gray-900'>
          <p className='b1 text-xl whitespace-pre-line'>
            {currentSlide.script || '스크립트가 없습니다.'}
          </p>
        </div>

        {/* 이미지 영역 */}

        <div className='flex h-44 w-50 flex-col items-center justify-start gap-2 rounded-xl border border-gray-200 bg-gray-100 p-3 shadow-sm'>
          {nextSlide ? (
            <span className='b2 text-gray-700'>다음: 슬라이드 {nextSlide.slideNumber}</span>
          ) : (
            <span className='b2 text-gray-700'>다음 슬라이드가 없습니다</span>
          )}
          <div className='relative aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100 shadow-md'>
            {nextSlide && (
              <img
                src={nextSlide.imageUrl}
                alt={`슬라이드 ${nextSlide.slideNumber + 1}`}
                className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptViewer;
