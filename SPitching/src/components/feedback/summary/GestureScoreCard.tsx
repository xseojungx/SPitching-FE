import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const GestureScoreCard = ({
  gestureScore,
  crossedScore,
  raisedScore,
  faceScore,
  explainScore,
  straightScore,
}: GestureFeedbackProps) => {
  const navigate = useNavigate();
  const { gesture } = useSelector((state: RootState) => state.feedback);
  return (
    <article className='group white-card relative col-span-3 col-start-9 row-span-4 row-start-4 transition duration-400 hover:-translate-y-1 hover:shadow-lg'>
      <p className='s1 justify-self-start text-gray-900'>제스처</p>
      <div className='flex w-full flex-1 flex-col items-center justify-center'>
        <div className='flex flex-1 flex-col items-center justify-center'>
          <p className='b2 text-gray-700'>총점</p>
          <p className='h1 bg-gradient-to-b from-[#255A9B] via-[#7AB7CE] to-[#A9EAD6] bg-clip-text text-transparent'>
            {gestureScore}
          </p>
        </div>

        <DetailFeedback
          gestureScore={gestureScore}
          crossedScore={crossedScore}
          raisedScore={raisedScore}
          faceScore={faceScore}
          explainScore={explainScore}
          straightScore={straightScore}
        />
      </div>
      <div
        className='s2 absolute bottom-3 left-1/2 z-10 w-fit -translate-x-1/2 translate-y-2 cursor-pointer rounded-md bg-linear-to-r from-[rgba(76,154,207,1)] via-[rgba(120,192,210,1)] to-[rgba(169,234,214,1)] px-4 py-3 whitespace-nowrap text-white opacity-0 shadow-sm backdrop-blur-sm transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100'
        onClick={() => navigate('/feedback/gesture')}
      >
        제스처 피드백 자세히 보러가기
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
  explainScore: number;
  straightScore: number;
};

const DetailFeedback = ({
  gestureScore,
  crossedScore,
  raisedScore,
  faceScore,
  explainScore,
  straightScore,
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
    <div className='gap flex w-full flex-3 flex-col space-y-3'>
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
