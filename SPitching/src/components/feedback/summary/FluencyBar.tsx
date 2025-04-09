import { useState } from 'react';

type Segment = { label: string; count: number; color: string };

type Props = {
  title: string;
  total: number;
  segments: Segment[];
  unit?: string;
};

export default function FluencyBar({
  title,
  total,
  segments,
  unit = '회',
}: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className='w-full space-y-2'>
      <div className='s2'>{title}</div>

      {/* bar wrapper */}
      <div className='relative flex h-2.5 w-full overflow-hidden rounded-full bg-[#ECEEEC]'>
        {segments.map((segment, idx) => {
          const widthPercent = (segment.count / total) * 100;

          return (
            <div
              key={idx}
              className='relative h-full cursor-pointer transition-all duration-200'
              style={{
                width: `${widthPercent}%`,
                backgroundColor: segment.color,
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === idx && (
                <div className='absolute bottom-[120%] left-1/2 z-10 -translate-x-1/2 rounded-md bg-[#303331] px-2 py-1 text-xs whitespace-nowrap text-white shadow-md'>
                  {segment.label}: {segment.count}
                  {unit}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
