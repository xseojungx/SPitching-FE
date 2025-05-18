import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

type Message = { role: 'user' | 'assistant'; content: string };

type Props = {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSend: (text: string) => void;
  loading: boolean;
};

const QAModal: React.FC<Props> = ({ isOpen, onClose, messages, onSend, loading }) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    className='fixed inset-0 z-50 flex items-center justify-center'
  >
    <div className='relative z-1 flex h-[70vh] w-full max-w-4xl flex-col rounded bg-white shadow-lg'>
      <div className='flex items-center justify-between border-b p-4'>
        <DialogTitle className='text-lg font-semibold'>Q&A 세션</DialogTitle>
        <button
          onClick={onClose}
          className='b2 rounded-lg bg-gray-100 px-4 py-1 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
        >
          질문 세션 끝내기 ✕
        </button>
      </div>
      <ChatWindow messages={messages} />
      <ChatInput
        onSend={onSend}
        disabled={loading}
      />
    </div>
    <div className='bg-opacity-70 fixed inset-0 z-0 flex items-center justify-center bg-gray-700/20 backdrop-blur-sm' />
  </Dialog>
);

export default QAModal;
