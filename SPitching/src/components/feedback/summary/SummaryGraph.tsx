import type { RecentPractice } from '@/types/presentation.types';
import SummaryAreaChart from './SummaryAreaChart';

const SummaryGraph = ({ recentPracticeData }: { recentPracticeData: RecentPractice }) => {
  return (
    <article className='white-card col-span-7 col-start-2 row-span-5 row-start-2 w-full'>
      <SummaryAreaChart recentPracticeData={recentPracticeData} />
    </article>
  );
};

export default SummaryGraph;
