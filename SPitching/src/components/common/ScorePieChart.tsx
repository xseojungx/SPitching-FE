import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';

interface ScorePieChartProps {
  value: number;
}

const ScorePieChart = ({ value }: ScorePieChartProps) => {
  const data = [{ name: 'progress', uv: value, fill: 'url(#gradient)' }];
  return (
    <ResponsiveContainer
      width='100%'
      height='100%'
    >
      <RadialBarChart
        cx='50%'
        innerRadius='70%'
        outerRadius='100%'
        barSize={20}
        data={data}
        startAngle={450}
        endAngle={90}
      >
        {/* 백그라운드 영역용 가짜 축 */}
        <PolarAngleAxis
          type='number'
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
          hide={true}
        />
        <RadialBar
          background
          dataKey='uv'
          cornerRadius={10}
        />
        <defs>
          <linearGradient
            id='gradient'
            x1='0.5'
            y1='0'
            x2='0.5'
            y2='1'
          >
            <stop
              offset='0%'
              stopColor='#A9EAD6'
            />
            <stop
              offset='100%'
              stopColor='#255A9B'
            />
          </linearGradient>
        </defs>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default ScorePieChart;
