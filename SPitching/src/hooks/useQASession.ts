// hooks/useQASession.ts
import { useState } from 'react';
import { usePostQuestion } from './usePractice';

type Message = { role: 'user' | 'assistant'; content: string };

export const useQASession = (pid: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: sendQuestion } = usePostQuestion();

  const handleUserSend = async (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);
    const res = await sendQuestion({ presentationId: pid, content: text });
    setMessages((prev) => [...prev, { role: 'assistant', content: res.content }]);
    setLoading(false);
  };

  return { messages, setMessages, loading, handleUserSend };
};
