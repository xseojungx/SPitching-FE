import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

import { RecentPracticeNotNull } from '@/types/presentation.types';

const TotalScore = ({ recentPracticeData }: { recentPracticeData: RecentPracticeNotNull }) => {
  //메모 처리하기
  const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className='rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#333] shadow-md'>
          <p>{`${payload[0].value}점`}</p>
        </div>
      );
    }

    return null;
  };

  const prevScoreData = [
    { name: 1, score: recentPracticeData.graph.currentScore },
    ...recentPracticeData.graph.previousScores.map((data, key) => {
      return { name: key + 2, score: data };
    }),
  ].reverse();

  return (
    <div className='white-card col-span-3 col-start-9 row-span-2 row-start-2 bg-linear-to-r from-[rgba(76,154,207,1)] via-[rgba(120,192,210,1)] to-[rgba(169,234,214,1)]'>
      <p className='c1 text-gray-50'>7회차 연습 결과</p>
      <div className='flex w-full items-baseline justify-between text-white'>
        <span className='h1'>{recentPracticeData.graph.currentScore}점</span>
        <span className='c1 text-gray-700'>전체연습 {recentPracticeData.practiceCount}회</span>
      </div>
      <div className='h-full w-full flex-1'>
        <ResponsiveContainer
          width='100%'
          height='100%'
        >
          <LineChart data={prevScoreData}>
            <YAxis
              domain={['dataMin-5', 'auto']}
              hide={true}
              width={0}
            />
            <Tooltip
              content={<CustomTooltip />}
              coordinate={{ y: 0 }}
            />
            <Line
              type='monotone'
              dataKey='score'
              stroke='#ffffff'
              strokeWidth={1.5}
              activeDot={{ r: 4 }}
              dot={{ strokeWidth: 1, fill: 'rgba(120, 192, 210, 1)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalScore;
