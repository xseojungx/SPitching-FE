import MockPPT from '@/assets/mock_ppt.png';

const ScriptViewer = () => {
  return (
    <div className='shadow-shadow-100 bg-box-white relative flex max-h-100 min-h-[160px] w-full justify-center overflow-auto rounded-2xl border border-[rgba(64,80,98,0.10)] px-[10vw] py-4 shadow-sm'>
      {/* 콘텐츠 wrapper */}
      <div className='flex w-full gap-6'>
        {/* 스크립트 영역 */}
        <div className='flex-1 overflow-auto pr-4 leading-relaxed text-gray-900'>
          <p className='b1'>
            2024년, 전 세계적으로 이상기후 현상이 빈번하게 발생하면서 큰 피해가
            이어졌습니다. 가장 큰 영향을 끼친 것은 강력한 태풍으로, 연이어
            발생하여 해안 지역을 초토화시켰습니다. 그뿐만 아니라, 대규모 산불이
            각 대륙에서 발생해 수천 헥타르의 숲이 불타고, 연기가 대기 오염을
            심화시키며 초미세입자의 에어로졸 응집체 현상을 유발했습니다. 동시에,
            예기치 못한 지진이 여러 지역을 강타해 인명과 재산 피해가 이어졌으며,
            마지막으로 이례적인 폭설로 인해 많은 지역이 마비되는 상황이
            일어났습니다. 2024년, 전 세계적으로 이상기후 현상이 빈번하게
            발생하면서 큰 피해가 이어졌습니다. 가장 큰 영향을 끼친 것은 강력한
            태풍으로, 연이어 발생하여 해안 지역을 초토화시켰습니다. 그뿐만
            아니라, 대규모 산불이 각 대륙에서 발생해 수천 헥타르의 숲이 불타고,
            연기가 대기 오염을 심화시키며 초미세입자의 에어로졸 응집체 현상을
            유발했습니다. 동시에, 예기치 못한 지진이 여러 지역을 강타해 인명과
            재산 피해가 이어졌으며, 마지막으로 이례적인 폭설로 인해 많은 지역이
            마비되는 상황이 일어났습니다.
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
