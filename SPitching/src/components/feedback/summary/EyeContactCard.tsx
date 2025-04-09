import ScorePieChart from '../../common/ScorePieChart';

type EyeContactCardProps = { eyecontactScore: number };

const EyeContactCard = ({ eyecontactScore }: EyeContactCardProps) => {
  // 점수에 따라 메시지 반환
  const getMessage = (score: number): string => {
    if (score <= 25)
      return '시선을 자주 피했어요. 청중과의 연결이 약해 보여요.';
    if (score <= 50)
      return '시선이 흔들렸어요. 소통이 부족하게 느껴질 수 있어요.';
    if (score <= 75)
      return '시선이 비교적 안정적이지만, 조금 더 아이컨택이 필요해요.';
    if (score <= 90) return '좋아요 시선이 자연스럽고 안정적이에요.';
    return '훌륭해요! 자신감 있고 전문적인 시선 처리를 보여줬어요.';
  };

  const message = getMessage(eyecontactScore);

  return (
    <div className='white-card col-span-3 col-start-9 row-span-3 row-start-8'>
      {/* 제목 */}
      <p className='s1 text-gray-900'>시선</p>
      <div className='flex w-full flex-1 flex-col items-center items-start gap-2'>
        <span className='h1 bg-gradient-to-b from-[#255A9B] via-[#7AB7CE] to-[#A9EAD6] bg-clip-text text-transparent'>
          65점
        </span>

        {/* 피드백 메시지 */}
        <div className='b2 flex-1 text-gray-700'>{message}</div>
      </div>

      {/* 영상 미리보기 영역 */}
      <div className='flex h-40 w-full items-center justify-center rounded-lg bg-[#ECEEEC] text-sm text-gray-500'>
        영상 미리보기
      </div>
    </div>
  );
};

export default EyeContactCard;
