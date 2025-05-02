import { Tooltip, ResponsiveContainer, TooltipProps, AreaChart, Area, YAxis } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

interface PracticeScore {
  name: string;
  score: number;
  ges: number;
  eye: number;
  sim: number;
  fluen: number;
}
type ScoreLineChartProps = { data: PracticeScore[] };

const ScoreLineChart = ({ data }: ScoreLineChartProps) => {
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
            activeDot={{ r: 4, fill: 'rgba(37, 90, 155, 1)', stroke: 'rgba(37, 90, 155, 1)' }}
            dot={{ strokeWidth: 1, fill: '#ffffff' }}
            fill='url(#colorScore)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ScoreLineChart;
