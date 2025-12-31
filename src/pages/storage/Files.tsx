import { useEffect, useState } from 'react';
import { Upload, Trash2, Download, FileIcon } from 'lucide-react';
import FileCard from './FileCard';
import { File } from '../../types';
import BackEndApisServiceInstance from '../../Api/ServerApis';
import ChunkUploader from '../../components/ChunkUploader';
import { getUserContext } from '../../UserContext';


export function Files() {
  const { storage: { files }, updateStore } = getUserContext();

  // const [files, setFiles] = useState<File[]>([]);

  // useEffect(() => {
  //   BackEndApisServiceInstance
  //     .getFiles().then(setFiles)
  // }, []);

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

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
        <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">

          <ChunkUploader handleUploadedFile={handleUploadedFile} />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
        <div className="overflow-x-auto">
          {files.length === 0 ? (
            <span aria-colspan={5} className="px-6 py-8 text-center text-gray-500">
              No files uploaded yet. Upload your first file!
            </span>
          ) : (
            files.map((file) => (
              <FileCard {...file} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
