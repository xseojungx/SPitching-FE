// Dashboard.tsx
import RecentPractice from '../../components/practiceList/RecentPractice';
import Navbar from '../../components/common/Navbar';
import PracticeListCard from '../../components/dashboard/PracticeListCard';
import { usePresentationList, useRecentPractice } from '@/hooks/useDashboard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: presentationListData, isLoading, isError } = usePresentationList();
  // const {data: recentPracticeData,isLoading,isError}=
  console.log('📄 Presentation list:', presentationListData);
  const {
    data: recentPracticeData,
    isLoading: recentPracticeLoading,
    isError: recentPracticeError,
  } = useRecentPractice();

  console.log('📄 Recent practice:', recentPracticeData);

  if (isLoading) {
    console.log('로딩중');
  }
  if (isError || !recentPracticeData || !presentationListData) {
    console.log('오류');
  }

  return (
    <div className='scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 flex h-screen flex-col items-center overflow-x-hidden overflow-y-auto'>
      <Navbar />
      {/* 모바일에선 여백 없이 꽉 채움 */}
      <div className='relative box-border flex min-h-2/3 w-screen items-center pt-18'>
        {recentPracticeData && (
          <RecentPractice
            key={recentPracticeData.practiceId}
            practiceId={recentPracticeData.practiceId}
            presentationId={recentPracticeData.presentationId}
            title={recentPracticeData.title}
            description={recentPracticeData.description}
            practiceCount={recentPracticeData.practiceCount}
            lastPractice={recentPracticeData.lastPractice}
            created={recentPracticeData.created}
            firstSlideImageUrl={recentPracticeData.firstSlideImageUrl}
            tags={recentPracticeData.tags}
            graph={recentPracticeData.graph}
          />
        )}
        <button
          className='fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full border-4 border-white bg-gradient-to-r from-[#4C9ACF] to-[#A9EAD6] px-6 py-2.5 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl'
          onClick={() => navigate('/practices/new/details')}
        >
          <span className='text-base font-semibold'>+ 발표 추가하기</span>
        </button>

        <div className="absolute left-0 -z-1 h-full w-screen bg-[url('/assets/dashboard_bg.svg')] bg-left-top bg-no-repeat not-first:bg-cover"></div>
      </div>
      <div className='mb-20 box-border flex w-8/12 flex-col-reverse items-center gap-2 pt-18'>
        {presentationListData &&
          presentationListData.map((presentationListData, index) => (
            <PracticeListCard
              key={index}
              title={presentationListData.title}
              description={presentationListData.description}
              practice_count={presentationListData.practices.length}
              last_practice={presentationListData.updatedAt}
              created_at={presentationListData.createdAt}
              firstSlideImageUrl={presentationListData.firstSlideImageUrl || ''}
              totalScore={presentationListData.totalScore || 0}
              updatedAt={presentationListData.updatedAt}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
