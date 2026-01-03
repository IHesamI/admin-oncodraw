import { useEffect, useState } from 'react';
import { Upload, Trash2, Download, FileIcon } from 'lucide-react';
import FileCard from './FileCard';
import { File } from '../../types';
import BackEndApisServiceInstance from '../../Api/ServerApis';
import ChunkUploader from '../../components/ChunkUploader';
import { getUserContext } from '../../UserContext';
import { formatSize } from './services';
import StorageVisualizer from '../../components/StorageVisualizer';
// import { Trash2 } from 'lucide-react';


export function Files() {
  const { storage: { files, totalStorage }, updateStore } = getUserContext();

  // const [files, setFiles] = useState<File[]>([]);


  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSelect = (file: File) => {
    setSelectedFiles((prev) =>
      prev.find(selectedFile => selectedFile.id == file.id)
        ? prev.filter((selectedFile) => file.id !== selectedFile.id) :
        [...prev, file]
    );
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedFiles.map((id) => BackEndApisServiceInstance.deleteFiles(selectedFiles))
      );
      updateStore((state) => ({
        ...state,
        storage: {
          ...state.storage,
          files: state.storage.files.filter(
            (file) => !selectedFiles.find(selectedFile => selectedFile.id == file.id)
          ),
        },
      }));
      setSelectedFiles([]);
    } catch (error) {
      console.error('Failed to delete files:', error);
    }
  };

  const handleUploadedFile = async (file: File[]) => {
    updateStore(state => ({
      ...state, storage: {
        ...state.storage,
        files: [...state.storage.files, ...file],
      }
    }));
  }

  return (
    <div className='h-full flex flex-col'>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Files</h2>
        <ChunkUploader
          handleUploadedFile={handleUploadedFile}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        />
      </div>
      <div>
        <StorageVisualizer
          totalStorage={totalStorage}
          files={files} />
      </div>

      <div className="flex mb-3 items-center gap-4">
        {

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            style={{
              visibility: selectedFiles.length > 0 ? 'visible' : 'hidden',
            }}
          >
            <Trash2 size={20} />
            <span>Delete {selectedFiles.length}</span>
          </button>
        }
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1 p-4 ">
        <div className="flex flex-wrap gap-2">
          {!files || !files.length ? (
            <span aria-colspan={5} className="px-6 py-8 text-center text-gray-500 w-full">
              No files uploaded yet. Upload your first file!
            </span>
          ) : (
            files.map((file) => (
              <FileCard
                isSelected={selectedFiles.some(selectedFile => selectedFile.id == file.id)}
                onSelect={handleSelect}
                file={file}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
