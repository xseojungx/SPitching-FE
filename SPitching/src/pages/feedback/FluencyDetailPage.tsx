// src/pages/FluencyDetailPage.tsx
import Navbar from '@/components/common/Navbar';
import TranscriptViewer from '@/components/feedback/fluency/TranscriptViewer';
import StatisticsSection from '@/components/feedback/fluency/StatisticsSection';
import { useFeedbackFluency } from '@/hooks/useFeedback';
import { setFluency } from '@/redux/slices/feedback.slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ScorePieChart from '@/components/common/ScorePieChart';
import { calculateFluencyFeedback } from '@/utils/feedbackMessage';

const FluencyDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { practiceId } = useParams();
  const { fluency, presentation } = useSelector((state: RootState) => state.feedback);
  const {
    data: fluencyData,
    isLoading,
    isError: fetchError,
  } = useFeedbackFluency(Number(practiceId));

  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fluency && fluencyData) {
      dispatch(setFluency(fluencyData));
    }
    if (!fluency && !fluencyData && !isLoading && fetchError) {
      setIsError(true);
    }
  }, [fluency, fluencyData, isLoading, fetchError, dispatch]);

  if (isError) return <div>유창성 데이터 없음</div>;

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 pb-8 [background:linear-gradient(112deg,#E9F4F1_2.32%,#E6EFF4_99.22%)] lg:pb-10 xl:pb-14'>
      <Navbar />

      <main className='grid-layout h-full w-full grid-rows-[auto_repeat(9,1fr)] pt-0'>
        <div className='col-span-0 md:col-span-1' />

        {/* 1) 제목 Fluency Summary */}
        <div className='col-span-10 col-start-2 flex w-full items-center justify-between gap-3'>
          <div className='flex items-end gap-2'>
            <span className='h1 text-gray-900'>{presentation?.title}</span>
            <span className='s2 text-gray-900'>발표 유창성 피드백</span>
          </div>
          <button
            onClick={() => navigate(`/feedback/${practiceId}/summary`)}
            className='flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50'
          >
            <ArrowLeft size={16} />
            전체 피드백으로 돌아가기
          </button>
        </div>

        {/* 1)) 좌측 컨텐츠 */}
        <div className='white-card col-span-3 col-start-2 row-span-9 flex flex-col items-start justify-start gap-4'>
          {/* <FluencySummaryCard fluencyScore={fluency?.fluencyScore ?? 0} /> */}
          <div className='flex w-full flex-col items-center justify-center border-b-1 px-3'>
            <div className='relative h-30 w-30 shrink-0'>
              <ScorePieChart value={fluency?.fluencyScore ?? 0} />
              <div className='h1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900'>
                {Math.round(fluency?.fluencyScore ?? 0)}
              </div>
            </div>
            <span className='s2 text-gray-900'>
              총점 {Math.round(fluency?.fluencyScore ?? 0)}점
            </span>
          </div>
          {/* 3) Statistics */}
          {fluency?.statisticsFiller && fluency?.statisticsSilence && (
            <div className='flex w-full flex-col gap-4'>
              <StatisticsSection
                title='어/음/그 추임새 통계'
                data={fluency?.statisticsFiller ?? []}
                type='filler'
              />
              <StatisticsSection
                title='발화 시간 대비 침묵 시간 통계'
                data={fluency?.statisticsSilence ?? []}
                type='silence'
              />
            </div>
          )}
        </div>

        {/* 2) Transcript */}
        <div className='white-card col-span-7 col-start-5 row-span-9 row-start-2 flex flex-col items-start justify-between overflow-hidden px-8 py-6'>
          <>
            <span className='h2 mb-2 w-full border-b-1 border-gray-300 pb-2 text-gray-800'>
              발화문
            </span>
            <TranscriptViewer transcript={fluency?.transcript ?? []} />
          </>

          <div className='mt-4 w-full rounded-2xl bg-gray-200 p-4'>
            <span className='b2 text-gray-900'>
              {calculateFluencyFeedback(fluency?.fluencyScore ?? 0)}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FluencyDetailPage;
