import { useRef, useState, useEffect } from 'react';
import PPTImage from '@/assets/mock_ppt_1.png';
import TagInput from './TagInput';

const ScriptEditor = () => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 텍스트에 맞춰 높이 설정
    }
  }, [text]);

  return (
    <div className='flex h-auto w-full justify-between overflow-x-hidden py-10'>
      {/* 피피티 사진 */}
      <div className='flex h-fit w-[20%] flex-col justify-center self-start px-10 pt-3'>
        <img
          className='shadow-[rgba(64, 80, 98, 0.1)] h-fit w-full rounded-[4px] object-contain shadow-xl'
          src={PPTImage}
          alt='ppt'
        />
        <div className='c1 bg-navy-700 mt-3 h-fit w-fit self-end rounded-xl px-2 py-1 text-right text-white'>
          1 페이지
        </div>
      </div>

      {/* 텍스트 편집 부분 */}
      <div className='flex min-h-full w-8/10 flex-col pr-10 pl-4'>
        <div className='flex-1'>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='발표 대본을 입력하세요'
            className='b1 focus:outline-navy-700 focus:ring-navy-700 min-h-full w-full overflow-hidden rounded-[4px] border-0 px-4 py-3 text-base leading-relaxed text-gray-700 outline-0 focus:text-gray-900 focus:ring-1'
            rows={1}
          />
        </div>
        {/* 태그 편집 부분 */}
        <div className='mt-2 flex h-fit w-full items-start'>
          <TagInput />
          <div className='ml-4 flex flex-wrap space-y-1 space-x-2'>
            <div className='from-coral-400 b1 flex h-8 w-fit items-center rounded-full bg-gradient-to-br to-rose-500 px-8 text-white'>
              태그
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScriptEditor;
