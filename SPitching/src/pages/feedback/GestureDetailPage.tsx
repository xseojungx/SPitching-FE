import Navbar from '@/components/common/Navbar';
import ScoreSummaryCard from '@/components/feedback/GestureDetail/ScoreSummaryCard';
import GestureVideo from '@/components/feedback/GestureDetail/GestureVideo';
import FeedbackTabs from '@/components/feedback/GestureDetail/FeedbackTabs';
import { getGestureFeedbackMessage } from '@/utils/getGestureFeedback';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { ArrowLeft } from 'lucide-react';
import { useFeedbackGesture } from '@/hooks/useFeedback';
import { useNavigate, useParams } from 'react-router-dom';
import { setGesture } from '@/redux/slices/feedback.slice';
import { useEffect, useState } from 'react';

const GestureDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { practiceId } = useParams();
  const { gesture } = useSelector((state: RootState) => state.feedback);
  const recentPractice = useSelector((state: RootState) => state.feedback.recentPractice);
  const navigate = useNavigate();

  const {
    data: gestureData,
    isLoading,
    isError: fetchError,
  } = useFeedbackGesture(Number(practiceId));
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!gesture && gestureData) {
      dispatch(setGesture(gestureData));
    }

    if (!gesture && !gestureData && !isLoading && fetchError) {
      setIsError(true);
    }
  }, [gesture, gestureData, isLoading, fetchError, dispatch]);

  if (isError) {
    return <div>제스처 데이터 없음</div>;
  }

  const { positiveFeedback, negativeFeedback } = getGestureFeedbackMessage({
    gestureScore: gesture?.gestureScore || 0,
    crossedScore: gesture?.crossedScore || 0,
    raisedScore: gesture?.raisedScore || 0,
    faceScore: gesture?.faceScore || 0,
    explainScore: gesture?.explainScore || 0,
    straightScore: gesture?.straightScore || 0,
  });

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 pb-8 [background:linear-gradient(112deg,#E9F4F1_2.32%,#E6EFF4_99.22%)] lg:pb-10 xl:pb-14'>
      <Navbar />
      <main className='grid-layout h-full w-full grid-rows-[auto_repeat(9,1fr)] pt-0'>
        <div className='col-span-0 md:col-span-1' />
        <div className='col-span-10 flex w-full items-center justify-between gap-3'>
          <div className='flex items-end gap-2'>
            <span className='h1 text-gray-900'>{recentPractice?.title}</span>
            <span className='s2 text-gray-900'>제스처 피드백</span>
          </div>
          <button
            onClick={() => navigate(`/feedback/${practiceId}/summary`)}
            className='flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50'
          >
            <ArrowLeft size={16} />
            전체 피드백으로 돌아가기
          </button>
        </div>

        <ScoreSummaryCard
          gestureScore={gesture?.gestureScore || 0}
          crossedScore={gesture?.crossedScore || 0}
          raisedScore={gesture?.raisedScore || 0}
          faceScore={gesture?.faceScore || 0}
          explainScore={gesture?.explainScore || 0}
          straightScore={gesture?.straightScore || 0}
        />
        {gesture?.videoUrl && gesture.videoUrl.length > 0 && (
          <GestureVideo videoUrl={gesture.videoUrl} />
        )}

        <FeedbackTabs
          positiveFeedback={positiveFeedback}
          negativeFeedback={negativeFeedback}
        />
      </main>
    </div>
  );
};

export default GestureDetailPage;
