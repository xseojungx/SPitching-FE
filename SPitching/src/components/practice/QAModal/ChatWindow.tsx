import React, { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';

type Message = { role: 'user' | 'assistant'; content: string };

type Props = { messages: Message[] };

const ChatWindow: React.FC<Props> = ({ messages }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex flex-1 flex-col space-y-1 overflow-y-auto px-6 py-4'>
      {messages.map((msg, idx) => (
        <ChatBubble
          key={idx}
          role={msg.role}
          content={msg.content}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
