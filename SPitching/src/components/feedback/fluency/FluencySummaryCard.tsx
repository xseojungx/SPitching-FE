// src/components/fluency/FluencySummaryCard.tsx
import React from 'react';

type Props = { fluencyScore: number };

// 원형 게이지 관련 상수
const RADIUS = 60;
const STROKE = 8;
const NORMALIZED_RADIUS = RADIUS - STROKE * 2;
const CIRCUMFERENCE = 2 * Math.PI * NORMALIZED_RADIUS;

export default function FluencySummaryCard({ fluencyScore }: Props) {
  // 0~100 사이 값을 stroke-dashoffset 으로 변환
  const percent = Math.min(Math.max(fluencyScore, 0), 100);
  const strokeDashoffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  // 점수에 따른 색상
  const getColor = () => {
    if (percent >= 80) return '#4C9ACF'; // 높음: 파랑
    if (percent >= 50) return '#FFB547'; // 보통: 노랑
    return '#E1677B'; // 낮음: 레드
  };

  return (
    <div className='mx-auto flex w-full flex-col items-center p-4'>
      <svg
        height={RADIUS * 2}
        width={RADIUS * 2}
        className='-rotate-90 transform'
      >
        <circle
          stroke='#E5E7EB'
          fill='transparent'
          strokeWidth={STROKE}
          r={NORMALIZED_RADIUS}
          cx={RADIUS}
          cy={RADIUS}
        />
        <circle
          stroke={getColor()}
          fill='transparent'
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE + ' ' + CIRCUMFERENCE}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
          r={NORMALIZED_RADIUS}
          cx={RADIUS}
          cy={RADIUS}
        />
      </svg>
      <p className='h2 mt-2 font-bold text-gray-900'>{percent.toFixed(1)}%</p>
      <p className='caption-m text-gray-600'>유창성 점수</p>
    </div>
  );
}
