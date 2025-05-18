import type { EyeContactScore } from '@/types/feedback.types';
import { useNavigate, useParams } from 'react-router-dom';

const EyeContactCard = ({
  eyeContactData,
  practiceId,
}: {
  eyeContactData: EyeContactScore;
  practiceId: number;
}) => {
  const navigate = useNavigate();
  // 점수에 따라 메시지 반환
  const getMessage = (score: number): string => {
    if (score <= 25) return '시선을 자주 피했어요. 청중과의 연결이 약해 보여요.';
    if (score <= 50) return '시선이 흔들렸어요. 소통이 부족하게 느껴질 수 있어요.';
    if (score <= 75) return '시선이 비교적 안정적이지만, 조금 더 아이컨택이 필요해요.';
    if (score <= 90) return '좋아요 시선이 자연스럽고 안정적이에요.';
    return '훌륭해요! 자신감 있고 전문적인 시선 처리를 보여줬어요.';
  };

  const message = getMessage(eyeContactData.eyecontactScore);

  return (
    <div className='white-card group relative col-span-3 col-start-9 row-span-3 row-start-8 cursor-pointer transition duration-400 hover:-translate-y-1 hover:shadow-lg'>
      {/* 제목 */}
      <p className='s2 text-gray-900'>시선</p>
      <div className='flex w-full flex-1 flex-col items-start gap-1'>
        <span className='h1 bg-gradient-to-b from-[#255A9B] via-[#7AB7CE] to-[#A9EAD6] bg-clip-text text-transparent'>
          {eyeContactData.eyecontactScore}점
        </span>

        {/* 피드백 메시지 */}
        <div className='b1 text-gray-900'>{message}</div>
      </div>

      {/* 영상 미리보기 영역 */}
      <div className='flex h-40 w-full items-center justify-center rounded-lg bg-[#ECEEEC] text-sm text-gray-500'>
        영상 미리보기
      </div>
      <div
        className='s2 absolute bottom-3 left-1/2 z-10 w-fit -translate-x-1/2 translate-y-2 cursor-pointer rounded-md bg-linear-to-r from-[rgba(76,154,207,1)] via-[rgba(120,192,210,1)] to-[rgba(169,234,214,1)] px-4 py-3 whitespace-nowrap text-white opacity-0 shadow-sm backdrop-blur-sm transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100'
        onClick={() => navigate(`/feedback/${practiceId}/eyecontact`)}
      >
        시선 피드백 자세히 보러가기
      </div>
    </div>
  );
};

export default EyeContactCard;
