import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SingleTag, TagsList, UploadSlidesResponse } from '@/types/presentation.types';

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
  addTag: (slideId: number, tag: string, tagId: number) => void;
  removeTag: (tagId: number) => void;
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

  const addTag = (slideId: number, tag: string, tagId: number) => {
    setTagListState((prev) => {
      const found = prev.find((t) => t.slideId === slideId);

      const newTag: SingleTag = { tagId, content: tag }; // ✅ 구조 변경

      if (found) {
        return prev.map((t) =>
          t.slideId === slideId ? { ...t, content: [...t.content, newTag] } : t,
        );
      } else {
        return [...prev, { slideId, content: [newTag] }];
      }
    });
  };

  const removeTag = (tagId: number) => {
    setTagListState((prev: TagsList) =>
      prev
        .map((slideTags) =>
          slideTags.content.find((tag) => tag.tagId === tagId)
            ? { ...slideTags, content: slideTags.content.filter((tag) => tag.tagId !== tagId) }
            : slideTags,
        )
        .filter((slideTags) => slideTags.content.length > 0),
    );
    console.log('tagList', tagList);
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
