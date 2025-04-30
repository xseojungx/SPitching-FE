// Dashboard.tsx
import RecentPractice from '../../components/practiceList/RecentPractice';
import Navbar from '../../components/common/Navbar';
import PracticeListCard from '../../components/dashboard/PracticeListCard';
import { usePresentationList } from '@/hooks/useDashboard';
import { presentationMockData } from '@/assets/mockData';
import { useEffect } from 'react';

const Dashboard = () => {
  const data = presentationMockData;
  // const { data, isLoading, isError } = usePresentationList();
  const queryResult = usePresentationList();
  const presentationList = queryResult.data;

  useEffect(() => {
    console.log(presentationList);
  }, []);
  // if (isLoading) {
  //   console.log('로딩중');
  // }
  // if (isError) {
  //   console.log('오류');
  // }

  return (
    <div className='flex h-screen flex-col items-center overflow-scroll'>
      <Navbar />
      {/* 모바일에선 여백 없이 꽉 채움 */}
      <div className='relative box-border flex min-h-2/3 w-screen items-center pt-18'>
        {data?.data[0] && (
          <RecentPractice
            title={data.data[0].title}
            description={data.data[0].description}
            practice_count={data.data[0].practice_count}
            last_practice={data.data[0].last_practice}
            created_at={data.data[0].created_at}
          />
        )}

        <div className="absolute left-0 -z-1 h-full w-screen bg-[url('/assets/dashboard_bg.svg')] bg-left-top bg-no-repeat not-first:bg-cover"></div>
      </div>
      <div className='box-border flex w-8/12 flex-col items-center gap-2 pt-18'>
        {data?.data.map((presentation, i) => (
          <PracticeListCard
            key={i}
            title={presentation.title}
            description={presentation.description}
            practice_count={presentation.practice_count}
            created_at={presentation.created_at}
            last_practice={presentation.last_practice}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
// [ { "id": 1, "title": "Sample" , “description” : “”, “practice_count”:4} ]
