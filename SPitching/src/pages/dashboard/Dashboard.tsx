// Dashboard.tsx
import RecentPractice from '../../components/practiceList/RecentPractice';
import Navbar from '../../components/common/Navbar';
import PracticeListCard from '../../components/dashboard/PracticeListCard';
import { usePresentationList } from '@/hooks/useDashboard';

import axios from 'axios';

const Dashboard = () => {
  const { data, isLoading, isError } = usePresentationList();

  if (isLoading) {
    console.log('로딩중');
  }
  if (isError) {
    console.log('오류');
  }

  axios
    .get('http://localhost:8080/api/v1/presentations/list', {
      withCredentials: true, // ← 세션 쿠키 포함 필수
    })
    .then((res) => {
      console.log('📄 Presentation list:', res.data);
    })
    .catch((err) => {
      console.error('❌ Axios error:', err);
    });

  return (
    <div className='flex h-screen flex-col items-center overflow-scroll'>
      <Navbar />
      {/* 모바일에선 여백 없이 꽉 채움 */}
      <div className='relative box-border flex min-h-2/3 w-screen items-center pt-18'>
        {data?.[0] && (
          <RecentPractice
            title={data[0].title}
            description={data[0].description}
            practice_count={data[0].practiceCount}
            last_practice={data[0].updatedAt}
            created_at={data[0].createdAt}
          />
        )}

        <div className="absolute left-0 -z-1 h-full w-screen bg-[url('/assets/dashboard_bg.svg')] bg-left-top bg-no-repeat not-first:bg-cover"></div>
      </div>
      <div className='box-border flex w-8/12 flex-col items-center gap-2 pt-18'>
        {data &&
          data.map((data, index) => (
            <PracticeListCard
              key={index}
              title={data.title}
              description={data.description}
              practice_count={data.practiceCount}
              last_practice={'2002'}
              created_at={data.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
// [ { "id": 1, "title": "Sample" , “description” : “”, “practice_count”:4} ]
