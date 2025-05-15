import { useRef, useState, useEffect } from 'react';
import { BookmarkPlus } from 'lucide-react';
import { usePracticeCreation } from '@/contexts/PracticeCreationContext';
import { usePostTag } from '@/hooks/usePrep';
interface TagInputProps {
  slideId: number;
}

const TagInput = ({ slideId }: TagInputProps) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [tagText, setTagText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTag } = usePracticeCreation();
  const { mutate: addTagMutation } = usePostTag();

  // 자동 너비 조절
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = 'auto';
      inputRef.current.style.width = `${Math.min(
        inputRef.current.scrollWidth + 12,
        300, // 최대 너비 제한 (옵션)
      )}px`;
    }
  }, [tagText]);

  const handleAddClick = () => {
    console.log('handleAddClick');
    setIsInputVisible(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleSubmit = () => {
    console.log('tagText', tagText);
    if (tagText.trim()) {
      console.log('tagText', tagText);
      addTagMutation({ slideId, content: tagText.trim() });
      setTagText('');
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      {isInputVisible && (
        <input
          ref={inputRef}
          type='text'
          maxLength={50}
          value={tagText}
          onChange={(e) => setTagText(e.target.value)}
          placeholder='태그 입력'
          className='b2 focus:ring-coral-400 rounded-[8px] border border-gray-300 px-3 py-1 text-gray-900 transition-all focus:ring-1 focus:outline-none'
        />
      )}
      <button
        onClick={tagText.trim() ? () => handleSubmit() : handleAddClick}
        className='from-coral-400 shadow-shadow-100 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r to-rose-500 text-white shadow-2xl transition'
      >
        <BookmarkPlus className='h-5' />
      </button>
    </div>
  );
};

export default TagInput;
