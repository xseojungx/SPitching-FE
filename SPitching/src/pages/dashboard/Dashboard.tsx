// Dashboard.tsx
import RecentPractice from '../../components/practiceList/RecentPractice';

const Dashboard = () => {
  return (
    <div className='relative overflow-hidden'>
      <RecentPractice />
      <div className='pointer-events-none fixed bottom-[6.125px] -z-10 flex w-full'>
        <div className="fixed top-0 h-[80vh] w-screen bg-[url('/assets/dashboard_bg.svg')] bg-contain bg-left-top bg-no-repeat"></div>
      </div>
    </div>
  );
};

export default Dashboard;
