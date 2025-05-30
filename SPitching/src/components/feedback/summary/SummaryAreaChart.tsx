import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  TooltipProps,
  Legend,
} from 'recharts';
import { useMemo, useState } from 'react';
import { ScoreItem } from '@/types/feedback.types';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
        <p>{label}</p>
        {payload.map((item) => {
          let koreanName = '';
          switch (item.dataKey) {
            case 'gestureScore':
              koreanName = '제스처';
              break;
            case 'eyeContactScore':
              koreanName = '시선';
              break;
            case 'cosineSimilarity':
              koreanName = '대본 유사도';
              break;
            case 'sttScore':
              koreanName = '발표 유창성';
              break;
          }
          return (
            <p
              key={item.dataKey}
              style={{ color: item.color }}
            >
              {koreanName}: {item.value}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};

const SummaryAreaChart = ({ graphScoresData }: { graphScoresData: ScoreItem[] }) => {
  console.log(graphScoresData);
  const data = graphScoresData.map((item) => ({
    name: item.period + '회차',
    gestureScore: item.gestureScore,
    eyeContactScore: item.eyeContactScore,
    cosineSimilarity: item.cosineSimilarity,
    sttScore: item.sttScore,
  }));

  // 1. 모든 값 중 Y값만 평탄화해서 한 배열로
  const allValues = useMemo(() => {
    return data.flatMap((item) => [
      item.gestureScore,
      item.eyeContactScore,
      item.cosineSimilarity,
      item.sttScore,
    ]);
  }, [data]);

  // 2. domain 계산
  const { domainMin, domainMax, ticks } = useMemo(() => {
    const rawMin = Math.min(...allValues.filter((value) => value !== null));
    const rawMax = Math.max(...allValues.filter((value) => value !== null));

    const domainMin = Math.floor((rawMin - 10 > 0 ? rawMin - 5 : 0) / 10) * 10;
    const domainMax = Math.ceil((rawMax + 10 < 100 ? rawMax + 5 : 100) / 10) * 10;

    const ticks = Array.from(
      { length: (domainMax - domainMin) / 10 + 1 },
      (_, i) => domainMin + i * 10,
    );

    return { domainMin, domainMax, ticks };
  }, [allValues]);

  //마우스
  const [opacity, setOpacity] = useState({
    gestureScore: 0.2,
    eyeContactScore: 0.2,
    cosineSimilarity: 0.2,
    sttScore: 0.2,
  });

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
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign='bottom'
          height={36}
          iconType='line'
          formatter={(value) => {
            switch (value) {
              case 'gestureScore':
                return '제스처';
              case 'eyeContactScore':
                return '시선';
              case 'cosineSimilarity':
                return '대본 유사도';
              case 'sttScore':
                return '발표 유창성';
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
          dataKey='gestureScore'
          stroke='#78D5D7'
          strokeWidth={2}
          fill='url(#colorGes)'
          fillOpacity={opacity.gestureScore}
          strokeOpacity={1}
        />
        <Area
          type='monotone'
          dataKey='eyeContactScore'
          stroke='#479f60'
          strokeWidth={2}
          fill='url(#colorEye)'
          fillOpacity={opacity.eyeContactScore}
          strokeOpacity={1}
        />
        <Area
          type='monotone'
          dataKey='cosineSimilarity'
          stroke='#8f8bd4'
          strokeWidth={2}
          fill='url(#colorSim)'
          fillOpacity={opacity.cosineSimilarity}
          strokeOpacity={1}
        />
        <Area
          type='monotone'
          dataKey='sttScore'
          stroke='#5B9BD5'
          strokeWidth={2}
          fill='url(#colorFluen)'
          fillOpacity={opacity.sttScore}
          strokeOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SummaryAreaChart;
