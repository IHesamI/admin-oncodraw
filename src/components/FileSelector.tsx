import React, { useState, useEffect } from 'react';
import { File } from '../types';

interface FileSelectorProps {
  availableFiles: File[];
  selectedFiles: File[];
  onSelectionChange: (selectedFiles: File[]) => void;
}

const FileSelector: React.FC<FileSelectorProps> = ({ availableFiles, selectedFiles, onSelectionChange }) => {
  const [localSelectedFiles, setLocalSelectedFiles] = useState<File[]>(selectedFiles);
  const [localAvailableFiles, setLocalAvailableFiles] = useState<File[]>([]);

  useEffect(() => {
    setLocalSelectedFiles(selectedFiles);
    const selectedIds = selectedFiles.map(f => f.id);
    setLocalAvailableFiles(availableFiles.filter(f => !selectedIds.includes(f.id)));
  }, [availableFiles, selectedFiles]);

  const handleSelectFile = (file: File) => {
    const newSelectedFiles = [...localSelectedFiles, file];
    setLocalSelectedFiles(newSelectedFiles);
    const newAvailableFiles = localAvailableFiles.filter(f => f.id !== file.id);
    setLocalAvailableFiles(newAvailableFiles);
    onSelectionChange(newSelectedFiles);
  };

  const handleDeselectFile = (file: File) => {
    const newSelectedFiles = localSelectedFiles.filter(f => f.id !== file.id);
    setLocalSelectedFiles(newSelectedFiles);
    const newAvailableFiles = [...localAvailableFiles, file];
    setLocalAvailableFiles(newAvailableFiles);
    onSelectionChange(newSelectedFiles);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-medium text-gray-700">Available Files</h3>
        <ul className="mt-2 h-64 overflow-y-auto rounded-md border border-gray-300">
          {localAvailableFiles.map(file => (
            <li
              key={file.id}
              onClick={() => handleSelectFile(file)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {file.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700">Selected Files</h3>
        <ul className="mt-2 h-64 overflow-y-auto rounded-md border border-gray-300">
          {localSelectedFiles.map(file => (
            <li
              key={file.id}
              onClick={() => handleDeselectFile(file)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileSelector;
