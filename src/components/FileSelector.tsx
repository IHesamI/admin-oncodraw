import React, { useState, useEffect } from 'react';
import { getUserContext } from '../UserContext';
import { formatSize as formatFileSize } from '../pages/storage/services';
import { File } from '../types';

interface FileSelectorProps {
  selectedFiles: File[];
  onSelectionChange: (selectedFiles: File[]) => void;
  isSingle?: boolean;
  title?: string;
}

const FileSelector: React.FC<FileSelectorProps> = ({
  selectedFiles,
  onSelectionChange,
  isSingle,
  title,
}) => {
  const [localSelectedFiles, setLocalSelectedFiles] =
    useState<File[]>(selectedFiles);
  const [availableFiles, setAvailableFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    storage: { files },
  } = getUserContext();

  useEffect(() => {
    setLocalSelectedFiles(selectedFiles);
    const selectedIds = selectedFiles.map((f) => f.id);
    setAvailableFiles(files.filter((f) => !selectedIds.includes(f.id)));
  }, [files, selectedFiles]);

  const selectFile = (file: File) => {
    let updated;
    if (isSingle) {
      updated = [file];
      setLocalSelectedFiles(updated);

    } else {
      updated = [...localSelectedFiles, file];
      setLocalSelectedFiles(updated);
    }
    setAvailableFiles((prev) => prev
      .filter((f) => f.id !== file.id));
    onSelectionChange(updated);
  };

  const removeFile = (file: File) => {
    const updated = localSelectedFiles.filter((f) => f.id !== file.id);
    setLocalSelectedFiles(updated);
    setAvailableFiles((prev) => [...prev, file]);
    onSelectionChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true)
          }}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
        >
          + Add files
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 min-h-[120px]">
        {localSelectedFiles.length === 0 ? (
          <p className="text-sm text-gray-400 text-center">
            No files selected
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {localSelectedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-lg border p-3 hover:shadow-sm transition"
              >
                <div className="truncate">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <button
                  onClick={() => removeFile(file)}
                  className="ml-3 text-xs text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 !m-0 z-50 flex items-center justify-center h-full ">
          <div
            onClick={() => setIsModalOpen(false)}
            className='w-full h-full absolute bg-black/40 '></div>
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl z-50 self-center">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h4 className="font-semibold text-gray-800">
                Available Files
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-400 px-1 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[350px] overflow-y-auto p-4 space-y-2">
              {availableFiles.length === 0 ? (
                <p className="text-sm text-gray-400 text-center">
                  No more files available
                </p>
              ) : (
                availableFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => selectFile(file)}
                    className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50 hover:border-indigo-400 transition"
                  >
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="border-t px-4 py-3 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSelector;
