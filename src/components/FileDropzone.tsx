import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paperclip } from 'lucide-react';

interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
  maxSize: number;
  accept: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ onDrop, maxSize, accept }) => {
  const onDropCallback = useCallback((acceptedFiles: File[]) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    maxSize,
    accept: accept.split(',').reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-amber-600 bg-amber-50' : 'border-gray-300 hover:border-amber-500'}`}
    >
      <input {...getInputProps()} />
      <Paperclip className="h-6 w-6 mx-auto mb-2 text-gray-400" />
      <p className="text-sm text-gray-600">
        {isDragActive
          ? "Déposez les fichiers ici..."
          : "Glissez et déposez des fichiers ici, ou cliquez pour sélectionner"}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Taille maximale: {Math.round(maxSize / 1000000)}MB
      </p>
    </div>
  );
};
