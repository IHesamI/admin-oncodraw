import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import FileCard from './FileCard';
import { File } from '../../types';
import BackEndApisServiceInstance from '../../Api/ServerApis';
import ChunkUploader from '../../components/ChunkUploader';
import { getUserContext } from '../../UserContext';

export function Files() {
  const {
    storage: { files },
    updateStore,
  } = getUserContext();
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedFiles.map((id) => BackEndApisServiceInstance.deleteFile(id))
      );
      updateStore((state) => ({
        ...state,
        storage: {
          ...state.storage,
          files: state.storage.files.filter(
            (file) => !selectedFiles.includes(file.id)
          ),
        },
      }));
      setSelectedFiles([]);
    } catch (error) {
      console.error('Failed to delete files:', error);
    }
  };

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  const handleUploadedFile = async (file: File[]) => {
    updateStore((state) => ({
      ...state,
      storage: {
        ...state.storage,
        files: [...state.storage.files, ...file],
      },
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Files</h2>
        <div className="flex items-center gap-4">
          {selectedFiles.length > 0 && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              <Trash2 size={20} />
              <span>Delete ({selectedFiles.length})</span>
            </button>
          )}
          <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            <ChunkUploader handleUploadedFile={handleUploadedFile} />
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No files uploaded yet. Upload your first file!
            </div>
          ) : (
            files.map((file) => (
              <FileCard
                key={file.id}
                {...file}
                onSelect={handleSelect}
                isSelected={selectedFiles.includes(file.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
