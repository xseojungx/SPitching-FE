import Navbar from '../../components/common/Navbar';
import SummaryGraph from '../../components/feedback/summary/SummaryGraph';
import TotalScore from '../../components/feedback/summary/TotalScore';
import DurationCard from '../../components/feedback/summary/DurationCard';
import EyeContactCard from '../../components/feedback/summary/EyeContactCard';
import FluencyCard from '../../components/feedback/summary/FluencyCard';
import GestureScoreCard from '../../components/feedback/summary/GestureScoreCard';
import SimilarityCard from '../../components/feedback/summary/SimilarityCard';

const FeedbackSummary = () => {
  return (
    <div className='box-border flex h-screen w-screen flex-col pt-20 pb-8 [background:linear-gradient(112deg,#E9F4F1_2.32%,#E6EFF4_99.22%)] lg:pb-10 xl:pb-14'>
      <Navbar />

      <main className='grid-layout h-full w-full grid-rows-[auto_repeat(9,1fr)] pt-0'>
        <div className='col-span-0 md:col-span-1' />
        <div className='col-span-10 flex w-full items-end gap-3'>
          <span className='h1 text-gray-900'>기후정의</span>
          <span className='b2 text-gray-700'>7/23</span>
        </div>
        <SummaryGraph />
        <TotalScore />
        <SimilarityCard />
        <DurationCard />
        <GestureScoreCard />
        <FluencyCard />
        <EyeContactCard />
      </main>
    </div>
  );
};

export default FeedbackSummary;
