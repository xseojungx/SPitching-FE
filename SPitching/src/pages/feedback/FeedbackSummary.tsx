import Navbar from '../../components/common/Navbar';
import SummaryGraph from '../../components/feedback/summary/SummaryGraph';
import TotalScore from '../../components/feedback/summary/TotalScore';
import DurationCard from '../../components/feedback/summary/DurationCard';
import EyeContactCard from '../../components/feedback/summary/EyeContactCard';
import FluencyCard from '../../components/feedback/summary/FluencyCard';
import GestureScoreCard from '../../components/feedback/summary/GestureScoreCard';
import SimilarityCard from '../../components/feedback/summary/SimilarityCard';

import { useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setGestureFeedback } from '@/redux/slices/gestureFeedback.slice';
import { presentationMockData } from '@/assets/mockData';

const FeedbackSummary = () => {
  const location = useLocation();
  const data = location.state;
  console.log('데이터', data);

  const dispatch = useDispatch();
  dispatch(
    setGestureFeedback({
      gestureScore: data.gestureScore,
      crossedScore: data.crossedScore,
      raisedScore: data.raisedScore,
      faceScore: data.faceScore,
      explainScore: data.explainScore,
      straightScore: data.straightScore,
      videoUrl: data.videoUrl,
    }),
  );

  const presentationData = presentationMockData.data[0];

  // if (!data) return <div>분석 결과 없음</div>;

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 pb-8 [background:linear-gradient(112deg,#E9F4F1_2.32%,#E6EFF4_99.22%)] lg:pb-10 xl:pb-14'>
      <Navbar />

      <main className='grid-layout h-full w-full grid-rows-[auto_repeat(9,1fr)] pt-0'>
        <div className='col-span-0 md:col-span-1' />
        <div className='col-span-10 flex w-full items-end gap-3'>
          <span className='h1 text-gray-900'>{presentationData.title}</span>
          <span className='b2 text-gray-700'>{presentationData.description}</span>
        </div>
        <SummaryGraph />
        <TotalScore />
        <SimilarityCard />
        <DurationCard />
        <GestureScoreCard
          crossedScore={data.crossedScore}
          gestureScore={data.gestureScore}
          raisedScore={data.raisedScore}
          faceScore={data.faceScore}
          explainScore={data.explainScore}
          straightScore={data.straightScore}
        />
        <FluencyCard />
        <EyeContactCard eyecontactScore={85} />
      </main>
    </div>
  );
};

export default FeedbackSummary;
