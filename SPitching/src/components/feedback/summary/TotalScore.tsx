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

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const TotalScore = () => {
  const { gestureScore } = useSelector((state: RootState) => state.gestureFeedback);
  const data = [
    { name: '1회차', score: 25 },
    { name: '2회차', score: 35 },
    { name: '3회차', score: 52 },
    { name: '4회차', score: 43 },
    { name: '5회차', score: 45 },
    { name: '6회차', score: 62 },
    { name: '7회차', score: (220 + gestureScore) / 4 },
  ];
  //메모 처리하기
  const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      console.log(payload);
      return (
        <div className='rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#333] shadow-md'>
          <p>{`${payload[0].value}점`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className='white-card col-span-3 col-start-9 row-span-2 row-start-2 bg-linear-to-r from-[rgba(76,154,207,1)] via-[rgba(120,192,210,1)] to-[rgba(169,234,214,1)]'>
      <p className='c2 text-gray-50'>7회차 연습 결과</p>
      <div className='flex w-full items-baseline justify-between text-white'>
        <span className='h1'>{data[6].score}점</span>
        <span className='c1'>전체연습 7회 | 부분연습 4회</span>
      </div>
      <div className='h-full w-full flex-1'>
        <ResponsiveContainer
          width='100%'
          height='100%'
        >
          <LineChart data={data}>
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
