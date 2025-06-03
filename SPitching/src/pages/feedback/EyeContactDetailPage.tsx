import Navbar from '@/components/common/Navbar';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { ArrowLeft } from 'lucide-react';
import { useFeedbackEyeContact } from '@/hooks/useFeedback';
import { useNavigate, useParams } from 'react-router-dom';
import { setEyeContact } from '@/redux/slices/feedback.slice';
import { useEffect, useState } from 'react';
import EyeSummaryCard from '@/components/feedback/eyecontact/EyeSummaryCard';
import EyeVideo from '@/components/feedback/eyecontact/EyeVideo';

const EyeContactDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { practiceId } = useParams();
  const { eyeContact } = useSelector((state: RootState) => state.feedback);
  const presentationData = useSelector((state: RootState) => state.feedback.presentation);
  const navigate = useNavigate();

  const {
    data: eyeContactData,
    isLoading,
    isError: fetchError,
  } = useFeedbackEyeContact(Number(practiceId));
  const [isError, setIsError] = useState(false);
  console.log('eyeContact', eyeContact);

  useEffect(() => {
    if (!eyeContact && eyeContactData) {
      dispatch(setEyeContact(eyeContactData));
    }

    if (!eyeContact && !eyeContactData && !isLoading && fetchError) {
      setIsError(true);
    }
  }, [eyeContact, eyeContactData, isLoading, fetchError, dispatch]);

  if (isError) {
    return <div>시선 데이터 없음</div>;
  }

  //   const { positiveFeedback, negativeFeedback } = getGestureFeedbackMessage({
  //     eyeContactScore: eyeContact?.eyeContactScore || 0,
  //   });

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 pb-8 [background:linear-gradient(112deg,#E9F4F1_2.32%,#E6EFF4_99.22%)] lg:pb-10 xl:pb-14'>
      <Navbar />
      <main className='grid-layout h-full w-full grid-rows-[auto_repeat(5,1fr)] pt-0'>
        <div className='col-span-0 md:col-span-1' />
        <div className='col-span-10 flex w-full items-center justify-between gap-3'>
          <div className='flex items-end gap-2'>
            <span className='h1 text-gray-900'>{presentationData?.title}</span>
            <span className='s2 text-gray-900'>시선 피드백</span>
          </div>
          <button
            onClick={() => navigate(`/feedback/${practiceId}/summary`)}
            className='flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50'
          >
            <ArrowLeft size={16} />
            전체 피드백으로 돌아가기
          </button>
        </div>
        {eyeContact?.videoUrl && eyeContact.videoUrl.length > 0 && (
          <EyeVideo videoUrl={eyeContact.videoUrl} />
        )}
        <EyeSummaryCard eyeContactScore={eyeContact?.eyecontactScore || 0} />
      </main>
    </div>
  );
};

export default EyeContactDetailPage;
