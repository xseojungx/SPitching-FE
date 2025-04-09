const GestureScoreCard = () => {
  return (
    <article className='white-card col-span-3 col-start-9 row-span-4 row-start-4'>
      <p className='s1 justify-self-start text-gray-900'>제스처</p>
      <div className='flex w-full flex-1 flex-col items-center justify-center'>
        <p className='b2 text-gray-700'>총점</p>
        <p className='h1 bg-gradient-to-b from-[#255A9B] via-[#7AB7CE] to-[#A9EAD6] bg-clip-text text-transparent'>
          89
        </p>
        <DetailFeedback
          gestureScore={89}
          crossedScore={12}
          raisedScore={8}
          faceScore={11}
        />
      </div>
    </article>
  );
};

export default GestureScoreCard;

import { useState } from 'react';

type GestureFeedbackProps = {
  gestureScore: number;
  crossedScore: number;
  raisedScore: number;
  faceScore: number;
};

const DetailFeedback = ({
  gestureScore = 89,
  crossedScore = 12,
  raisedScore = 5,
  faceScore = 10,
}: GestureFeedbackProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const positives: string[] = [];
  const negatives: string[] = [];

  // 간결한 긍정 피드백
  if (gestureScore >= 70) {
    positives.push('안정된 자세와 손동작이 발표에 도움이 되었어요.');
    positives.push('제스처가 자연스럽고 자신감 있게 표현되었어요.');
  }

  // 간결한 개선 피드백
  if (gestureScore < 70) {
    negatives.push('손동작을 적극 활용하면 설득력이 높아져요.');
  }
  if (crossedScore >= 10) {
    negatives.push('팔짱은 방어적인 인상을 줘요. 자연스럽게 풀어보세요.');
  }
  if (raisedScore >= 10) {
    negatives.push('손을 과도하게 올리는 동작은 강압적으로 보일 수 있어요.');
  }
  if (faceScore >= 10) {
    negatives.push('얼굴을 자주 만지는 제스처는 긴장감을 줄 수 있어요.');
  }

  return (
    <div className='gap flex w-full flex-1 flex-col space-y-3'>
      {positives.length > 0 && (
        <div>
          <p className='s2 text-navy-700 mb-1'>✅ 잘한 점</p>
          <ul className='b2 space-y-1 text-gray-700'>
            {positives.map((msg, i) => (
              <li key={i}>• {msg}</li>
            ))}
          </ul>
        </div>
      )}

      {negatives.length > 0 && (
        <div>
          <p className='s2 mt-3 mb-1 text-rose-500'>⚠️ 개선이 필요한 점</p>
          <ul className='b2 space-y-1 text-gray-700'>
            {negatives.map((msg, i) => (
              <li key={i}>• {msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
