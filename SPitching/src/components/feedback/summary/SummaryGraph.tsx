import SummaryAreaChart from './SummaryAreaChart';
import { GraphScoreResponse } from '@/types/feedback.types';

const SummaryGraph = ({ graphScoresData }: { graphScoresData: GraphScoreResponse }) => {
  return (
    <article className='white-card col-span-7 col-start-2 row-span-5 row-start-2 w-full'>
      <SummaryAreaChart graphScoresData={graphScoresData.score} />
    </article>
  );
};

export default SummaryGraph;
