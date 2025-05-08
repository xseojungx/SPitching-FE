import React, { createContext, useContext, useState, ReactNode } from 'react';

// 연습 생성 컨텍스트 타입
interface PracticeCreationContextValue {
  practiceId: number | null;
  title: string;
  description: string;
  file: File | null;
  duration: string;
  script: string;
  setDetails: (details: { title: string; description: string; duration: string }) => void;
  setFile: (file: File) => void;
  setScript: (script: string) => void;
  setPracticeId: (id: number) => void;
}

const PracticeCreationContext = createContext<PracticeCreationContextValue | undefined>(undefined);

export const PracticeCreationProvider = ({ children }: { children: ReactNode }) => {
  const [practiceId, setPracticeIdState] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFileState] = useState<File | null>(null);
  const [duration, setDuration] = useState('');
  const [script, setScriptState] = useState('');

  const setDetails = (details: { title: string; description: string; duration: string }) => {
    setTitle(details.title);
    setDescription(details.description);
    setDuration(details.duration);
  };

  const setFile = (file: File) => {
    setFileState(file);
  };

  const setScript = (text: string) => {
    setScriptState(text);
  };

  const setPracticeId = (id: number) => {
    setPracticeIdState(id);
  };

  return (
    <PracticeCreationContext.Provider
      value={{
        practiceId,
        title,
        description,
        file,
        duration,
        script,
        setDetails,
        setFile,
        setScript,
        setPracticeId,
      }}
    >
      {children}
    </PracticeCreationContext.Provider>
  );
};

export const usePracticeCreation = () => {
  const context = useContext(PracticeCreationContext);
  if (!context) {
    throw new Error('usePracticeCreation must be used within PracticeCreationProvider');
  }
  return context;
};
