// src/components/practice/QAModal/ChatBubble.tsx
import React from 'react';

type Props = { role: 'user' | 'assistant'; content: string };

const ChatBubble: React.FC<Props> = ({ role, content }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-[80%] rounded-lg p-2 shadow ${
          isUser ? 'bg-mint-500 text-gray-900' : 'bg-gray-200 text-gray-800'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatBubble;
