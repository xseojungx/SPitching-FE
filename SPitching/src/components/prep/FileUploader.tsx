import { FC, useRef } from 'react';
import { Upload } from 'lucide-react';

type FileUploaderProps = { file: File | null; onFileSelect: (file: File) => void };

const FileUploader: FC<FileUploaderProps> = ({ file, onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === 'application/pdf') {
      onFileSelect(dropped);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      onFileSelect(selected);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
      className='flex h-40 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-gray-400'
    >
      <input
        ref={inputRef}
        type='file'
        accept='application/pdf'
        className='hidden'
        onChange={handleChange}
      />

      {file ? (
        <p className='w-10/12 truncate text-center font-medium text-gray-700'>📄 {file.name}</p>
      ) : (
        <div className='flex flex-col items-center text-gray-400'>
          <Upload className='mb-2 h-6 w-6' />
          <p className='text-sm'>PDF 형식만 업로드 가능합니다</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
