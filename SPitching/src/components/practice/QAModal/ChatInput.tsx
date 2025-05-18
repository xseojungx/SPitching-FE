import React, { useState } from 'react';

type Props = { onSend: (text: string) => void; disabled?: boolean };

const ChatInput: React.FC<Props> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className='flex items-center gap-2 border-t p-4'>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className='flex-1 rounded border p-2'
        placeholder='메시지를 입력하세요...'
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
        className='rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50'
      >
        전송
      </button>
    </div>
  );
};

export default ChatInput;
