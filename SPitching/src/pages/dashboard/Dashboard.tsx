// Dashboard.tsx
import RecentPractice from '../../components/practiceList/RecentPractice';
import Navbar from '../../components/common/Navbar';
import PracticeListCard from '../../components/dashboard/PracticeListCard';

const Dashboard = () => {
  return (
    <div className='flex h-screen flex-col items-center overflow-scroll'>
      <Navbar />
      {/* 모바일에선 여백 없이 꽉 채움 */}
      <div className='relative box-border flex min-h-2/3 w-screen items-center pt-18'>
        <RecentPractice />
        <div className="absolute left-0 -z-1 h-full w-screen bg-[url('/assets/dashboard_bg.svg')] bg-left-top bg-no-repeat not-first:bg-cover"></div>
      </div>
      <div className='box-border flex w-8/12 flex-col items-center gap-2 pt-18'>
        <PracticeListCard />
        <PracticeListCard />
        <PracticeListCard />
        <PracticeListCard />
        <PracticeListCard />
      </div>
    </div>
  );
};

export default Dashboard;
