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
    <DialogPanel className='fixed inset-0 bg-black opacity-30' />
    <div className='relative flex h-[70vh] w-full max-w-md flex-col rounded bg-white shadow-lg'>
      <div className='flex items-center justify-between border-b p-4'>
        <DialogTitle className='text-lg font-semibold'>Q&A 세션</DialogTitle>
        <button
          onClick={onClose}
          className='text-gray-500 hover:text-gray-900'
        >
          ✕
        </button>
      </div>
      <ChatWindow messages={messages} />
      <ChatInput
        onSend={onSend}
        disabled={loading}
      />
    </div>
  </Dialog>
);

export default QAModal;
