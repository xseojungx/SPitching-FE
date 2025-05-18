import React from 'react';

type Props = { role: 'user' | 'assistant'; content: string };

const ChatBubble: React.FC<Props> = ({ role, content }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`b1 max-w-[80%] rounded-2xl border-gray-300 p-3 shadow-sm ${
          isUser
            ? 'bg-mint-500 rounded-tr-none text-gray-900'
            : 'rounded-tl-none bg-gray-100 text-gray-800'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatBubble;
