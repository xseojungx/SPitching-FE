import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Legend,
} from 'recharts';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const SummaryAreaChart = () => {
  const { gestureScore } = useSelector((state: RootState) => state.gestureFeedback);

  const data = [
    { name: '1회차', ges: 45, eye: 60, sim: 50, fluen: 55 },
    { name: '2회차', ges: 52, eye: 58, sim: 65, fluen: 62 },
    { name: '3회차', ges: 60, eye: 55, sim: 70, fluen: 68 },
    { name: '4회차', ges: 65, eye: 72, sim: 66, fluen: 74 },
    { name: '5회차', ges: 58, eye: 78, sim: 73, fluen: 70 },
    { name: '6회차', ges: 70, eye: 65, sim: 80, fluen: 75 },
    { name: '7회차', ges: gestureScore, eye: 85, sim: 68, fluen: 80 },
  ];

  // 1. 모든 값 중 Y값만 평탄화해서 한 배열로
  const allValues = useMemo(() => {
    return data.flatMap((item) => [item.ges, item.eye, item.sim, item.fluen]);
  }, [data]);

  // 2. domain 계산
  const { domainMin, domainMax, ticks } = useMemo(() => {
    const rawMin = Math.min(...allValues);
    const rawMax = Math.max(...allValues);

    const domainMin = Math.floor((rawMin - 10 > 0 ? rawMin - 5 : 0) / 10) * 10;
    const domainMax = Math.ceil((rawMax + 10 < 100 ? rawMax + 5 : 100) / 10) * 10;

    const ticks = Array.from(
      { length: (domainMax - domainMin) / 10 + 1 },
      (_, i) => domainMin + i * 10,
    );

    return { domainMin, domainMax, ticks };
  }, [allValues]);

  //마우스
  const [opacity, setOpacity] = useState({ ges: 0.2, eye: 0.2, sim: 0.2, fluen: 0.2 });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.2 }));
  };

  return (
    <ResponsiveContainer
      width='100%'
      height='100%'
    >
      <AreaChart
        width={730}
        height={250}
        data={data}
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient
            id='colorGes'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='5%'
              stopColor='#78D5D7'
              stopOpacity={0.7}
            />
            <stop
              offset='95%'
              stopColor='#78D5D7'
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient
            id='colorEye'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='5%'
              stopColor='#6be48d'
              stopOpacity={0.7}
            />
            <stop
              offset='95%'
              stopColor='#6be48d'
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient
            id='colorSim'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='5%'
              stopColor='#8f8bd4'
              stopOpacity={0.7}
            />
            <stop
              offset='95%'
              stopColor='#8f8bd4'
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient
            id='colorFluen'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='5%'
              stopColor='#5B9BD5'
              stopOpacity={0.7}
            />
            <stop
              offset='95%'
              stopColor='#5B9BD5'
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        {/* Axes */}
        <XAxis dataKey='name' />
        <YAxis
          domain={[domainMin, domainMax]}
          ticks={ticks}
          interval={0}
          tick={{ fontSize: 12, fill: '#5A5F5C' }}
        />

        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend
          verticalAlign='bottom'
          height={36}
          iconType='line'
          formatter={(value) => {
            switch (value) {
              case 'ges':
                return '제스처';
              case 'eye':
                return '시선';
              case 'sim':
                return '유사도';
              case 'fluen':
                return '유창성';
              default:
                return value;
            }
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Area charts */}
        <Area
          type='monotone'
          dataKey='ges'
          stroke='#78D5D7'
          strokeWidth={2}
          fill='url(#colorGes)'
          fillOpacity={opacity.ges}
          strokeOpacity={1}
        />
        <Area
          type='monotone'
          dataKey='eye'
          stroke='#479f60'
          strokeWidth={2}
          fill='url(#colorEye)'
          fillOpacity={opacity.eye}
          strokeOpacity={1}
        />
        <Area
          type='monotone'
          dataKey='sim'
          stroke='#8f8bd4'
          strokeWidth={2}
          fill='url(#colorSim)'
          fillOpacity={opacity.sim}
          strokeOpacity={1}
        />
        <Area
          type='monotone'
          dataKey='fluen'
          stroke='#5B9BD5'
          strokeWidth={2}
          fill='url(#colorFluen)'
          fillOpacity={opacity.fluen}
          strokeOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SummaryAreaChart;
