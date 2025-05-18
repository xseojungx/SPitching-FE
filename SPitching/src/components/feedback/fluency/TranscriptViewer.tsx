// src/components/fluency/TranscriptViewer.tsx
import React from 'react';

type Segment = { start: number; end: number; tag: string; result: string };

type Props = { transcript: Segment[] };

export default function TranscriptViewer({ transcript }: Props) {
  return (
    <div className='flex-1 overflow-y-auto'>
      {transcript.map((seg, idx) => {
        const isSilence = seg.tag === '0000';
        const isFiller = !isSilence && ['어', '음', '그'].includes(seg.result.trim());

        if (isSilence) {
          const durationSec = Math.round((seg.end - seg.start) / 1000);
          const pad = durationSec * 4; // seconds ÷ 5
          // 침묵: 회색 가로 바
          return (
            <span
              key={idx}
              className='c2 mx-1 h-2 rounded-sm bg-gray-100 py-0.5 text-nowrap text-gray-400'
              style={{ paddingLeft: `${pad}px`, paddingRight: `${pad}px` }}
            >
              {`${durationSec}초 공백`}
            </span>
          );
        }

        if (isFiller) {
          // 필러: 인라인 하이라이트
          return (
            <span
              key={idx}
              className='b2 mx-0.5 rounded-sm bg-yellow-100 px-1 text-nowrap text-yellow-800'
            >
              {seg.result}
            </span>
          );
        }

        // 일반 발화
        return (
          <span
            key={idx}
            className='text-[17px] leading-relaxed font-normal tracking-normal text-gray-900'
          >
            {seg.result}
          </span>
        );
      })}
    </div>
  );
}
