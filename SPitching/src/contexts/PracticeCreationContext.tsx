import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TagsList, UploadSlidesResponse, Tag } from '@/types/presentation.types';

// 연습 생성 컨텍스트 타입
interface PracticeCreationContextValue {
  presentationId: number | null;
  title: string;
  description: string;
  file: File | null;
  duration: string;
  slides: UploadSlidesResponse;
  tagList: TagsList;
  setDetails: (details: { title: string; description: string; duration: string }) => void;
  setFile: (file: File) => void;
  setScript: ({ slideId, text }: { slideId: number; text: string }) => void;
  setPresentationId: (id: number) => void;
  setSlides: (slides: UploadSlidesResponse) => void;
  addTag: (slideId: number, tag: string, id: number) => void;
  removeTag: (slideId: number, tag: string) => void;
}

const PracticeCreationContext = createContext<PracticeCreationContextValue | undefined>(undefined);

export const PracticeCreationProvider = ({ children }: { children: ReactNode }) => {
  const [presentationId, setPracticeIdState] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFileState] = useState<File | null>(null);
  const [duration, setDuration] = useState('');
  const [slides, setSlidesState] = useState<UploadSlidesResponse>([]);
  const [tagList, setTagListState] = useState<TagsList>([]);

  const setDetails = (details: { title: string; description: string; duration: string }) => {
    setTitle(details.title);
    setDescription(details.description);
    setDuration(details.duration);
  };

  const setFile = (file: File) => {
    setFileState(file);
  };

  const setScript = ({ slideId, text }: { slideId: number; text: string }) => {
    const updatedSlides = slides.map((slide) => {
      if (slide.id === slideId) {
        return { ...slide, script: text };
      }
      return slide;
    });
    setSlidesState(updatedSlides);
  };

  const setPresentationId = (id: number) => {
    setPracticeIdState(id);
  };

  const setSlides = (slides: UploadSlidesResponse) => {
    setSlidesState(slides);
  };

  const addTag = (slideId: number, newTag: string, id: number) => {
    setTagListState((prev) => {
      const found = prev.find((t) => t.slideId === slideId);
      if (found) {
        if (found.content.includes(newTag)) return prev;
        return prev.map((t) =>
          t.slideId === slideId ? { ...t, content: [...t.content, newTag], id: id } : t,
        );
      } else {
        return [...prev, { slideId, content: [newTag], id: id }];
      }
    });
  };

  const removeTag = (slideId: number, tagToRemove: string) => {
    setTagListState((prev) =>
      prev
        .map((t) =>
          t.slideId === slideId
            ? { ...t, content: t.content.filter((tag) => tag !== tagToRemove) }
            : t,
        )
        .filter((t) => t.content.length > 0),
    );
  };

  return (
    <PracticeCreationContext.Provider
      value={{
        presentationId,
        title,
        description,
        file,
        duration,
        slides,
        tagList,
        setDetails,
        setFile,
        setScript,
        setPresentationId,
        setSlides,
        addTag,
        removeTag,
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
