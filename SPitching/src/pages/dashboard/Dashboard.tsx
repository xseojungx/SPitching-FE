// Dashboard.tsx
import RecentPractice from '../../components/practiceList/RecentPractice';
import Navbar from '../../components/common/Navbar';

const Dashboard = () => {
  return (
    <div className='grid-layout overflow-hidden'>
      <Navbar />
      <div className='col-span-0 md:col-span-1' />
      {/* 모바일에선 여백 없이 꽉 채움 */}
      <RecentPractice />
      <div className='pointer-events-none fixed bottom-[6.125px] -z-10 flex w-full'>
        <div className="fixed top-0 left-0 h-[80vh] w-screen bg-[url('/assets/dashboard_bg.svg')] bg-cover bg-left-top bg-no-repeat"></div>
      </div>
    </div>
  );
};

export default Dashboard;
