// src/components/feedback/fluency/StatisticsSection.tsx
import React from 'react';

type FillerData = {
  eo: number;
  eum: number;
  geu: number;
  totalFillerCount: number;
  fillerRatio: number; // %
};

type SilenceData = {
  silenceRatio: number; // %
  speakingRatio: number; // %
  totalPresentationTime: number; // s
};

type Props = { title: string; data: FillerData[] | SilenceData[]; type: 'filler' | 'silence' };

export default function StatisticsSection({ title, data, type }: Props) {
  // 데이터 추출
  const item = data[0] as FillerData & SilenceData;
  const entries =
    type === 'filler'
      ? [
          { name: '어', value: (item as FillerData).eo, unit: '회' },
          { name: '음', value: (item as FillerData).eum, unit: '회' },
          { name: '그', value: (item as FillerData).geu, unit: '회' },
        ]
      : [
          { name: '발화', value: (item as SilenceData).speakingRatio, unit: '%' },
          { name: '침묵', value: (item as SilenceData).silenceRatio, unit: '%' },
        ];

  // 차트 스케일링을 위한 최대값 계산
  const maxValue = Math.max(...entries.map((e) => e.value));

  return (
    <div className='w-full'>
      {/* 제목 */}
      <h3 className='s2 mb-3 text-gray-800'>{title}</h3>

      {/* 1) 가로 바 차트 */}
      <div className='space-y-1'>
        {entries.map((e) => {
          // 색상 결정
          let barColor = '';
          if (type === 'filler') {
            barColor = 'bg-[#FDE68A]';
          } else {
            barColor = e.name === '침묵' ? 'bg-[#FF8A80]' : 'bg-[#4C9ACF]';
          }

          return (
            <div
              key={e.name}
              className='flex items-center gap-1.5'
            >
              <span className='b2 overflow-visible font-medium text-nowrap text-gray-700'>
                {e.name}
              </span>
              <div
                className={`h-2 rounded-full ${barColor}`}
                style={{ width: `${(e.value / maxValue) * 100}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* 2) 불렛 리스트 */}
      <div className='b1 mt-2 flex list-inside list-none justify-between space-y-1 text-gray-900'>
        {entries.map((e) => (
          <span
            className='mx-2'
            key={e.name}
          >
            {e.name}: {e.value}
            {e.unit}
          </span>
        ))}
      </div>
    </div>
  );
}
