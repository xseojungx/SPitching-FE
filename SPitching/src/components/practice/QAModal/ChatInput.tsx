import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

type Props = { onSend: (text: string) => void; disabled?: boolean };

const ChatInput: React.FC<Props> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className='flex items-center justify-between gap-2 border-t p-4'>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit())}
        className='min-h-10 flex-1 rounded-2xl bg-gray-100 px-4 py-2'
        rows={1}
        placeholder='메시지를 입력하세요...'
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
        className='flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-white disabled:opacity-50'
      >
        <Send className='h-5 w-5' />
      </button>
    </div>
  );
};

export default ChatInput;
