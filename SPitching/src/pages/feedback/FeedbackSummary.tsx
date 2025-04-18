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
    <div className='box-border flex h-screen w-screen flex-col pt-24 pb-8 [background:linear-gradient(112deg,#E9F4F1_2.32%,#E6EFF4_99.22%)] lg:pb-10 xl:pb-14'>
      <Navbar />

      <main className='grid-layout h-full w-full grid-rows-[auto_repeat(9,1fr)] pt-0'>
        <div className='col-span-0 md:col-span-1' />
        <div className='col-span-10 flex w-full items-end gap-3'>
          <span className='h1 text-gray-900'>
            기후 변화와 글로벌 경제: 지속 가능한 미래를 위한 대응 전략
          </span>
          <span className='b2 text-gray-700'>7/23일 기후정의 기말 발표</span>
        </div>
        <SummaryGraph />
        <TotalScore />
        <SimilarityCard />
        <DurationCard />
        <GestureScoreCard />
        <FluencyCard />
        <EyeContactCard eyecontactScore={85} />
      </main>
    </div>
  );
};

export default FeedbackSummary;
