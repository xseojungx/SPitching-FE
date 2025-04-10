import {
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  AreaChart,
  Area,
  YAxis,
} from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

const data = [
  { name: '1회차', score: 25 },
  { name: '2회차', score: 35 },
  { name: '3회차', score: 52 },
  { name: '4회차', score: 43 },
  { name: '5회차', score: 45 },
  { name: '6회차', score: 62 },
  { name: '7회차', score: 57 },
  { name: '8회차', score: 72 },
];

const ScoreLineChart = () => {
  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
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
    <div className='h-full w-full flex-1'>
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id='colorScore'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop
                offset='5%'
                stopColor='#95dde2'
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor='#95dde2'
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <YAxis
            type='number'
            domain={['dataMin', 'dataMax']}
            hide={true}
          />

          <Tooltip
            content={<CustomTooltip />}
            coordinate={{ y: 0 }}
          />
          <Area
            type='monotone'
            dataKey='score'
            stroke='rgba(37, 90, 155, 1)'
            strokeWidth={1.5}
            activeDot={{
              r: 4,
              fill: 'rgba(37, 90, 155, 1)',
              stroke: 'rgba(37, 90, 155, 1)',
            }}
            dot={{ strokeWidth: 1, fill: '#ffffff' }}
            fill='url(#colorScore)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ScoreLineChart;
