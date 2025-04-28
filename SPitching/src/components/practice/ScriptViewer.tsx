import MockPPT from '@/assets/mock_ppt_2.png';

const ScriptViewer = () => {
  return (
    <div className='shadow-shadow-100 bg-box-white relative mt-8 flex max-h-80 min-h-[160px] w-full justify-center overflow-auto rounded-2xl border border-[rgba(64,80,98,0.10)] px-[10vw] py-4 shadow-sm'>
      {/* 콘텐츠 wrapper */}
      <div className='flex w-full gap-6'>
        {/* 스크립트 영역 */}
        <div className='flex-1 overflow-auto pr-4 leading-relaxed text-gray-900'>
          <p className='b1 text-xl'>
            제스처 분석을 중점적으로 보여드리겠습니다.
            <br />
            우선 긍정적인 제스처는 총 2가지가 있는데요, 설명을 돕는 손동작과 바른 자세가 있습니다.
            <br />
            반면 부정적인 제스처는 총 3가지로 팔짱을 끼는 행동, 팔을 갑자기 들어올리는 행동, 그리고
            손을 얼굴 근처에 가져가는 행동으로 분류됩니다.
          </p>
        </div>

        {/* 이미지 영역 */}
        <div className='box-border flex h-30 shrink-0 flex-col justify-center rounded-md bg-gray-200 p-3'>
          <p className='b2'>다음 페이지</p>
          <img
            src={MockPPT}
            alt='PPT'
            className='h-full w-full rounded-md object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default ScriptViewer;
