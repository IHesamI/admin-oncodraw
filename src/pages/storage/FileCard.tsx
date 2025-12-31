import React from 'react';
import { File } from '../../types';
import {
  FileText,
  Image,
  Video,
  Music,
  File as FileIcon,
} from 'lucide-react';
import { formatSize } from './services';

type FileCardProps = {
  file: File;
  onSelect: (file: File) => void;
  isSelected: boolean;
};

const getFileIcon = (mime: string) => {
  if (mime.startsWith('image/')) return <Image size={24} />;
  if (mime.startsWith('video/')) return <Video size={24} />;
  if (mime.startsWith('audio/')) return <Music size={24} />;
  if (mime.includes('pdf')) return <FileText size={24} />;
  return <FileIcon size={24} />;
};



const formatMime = (mime: string) => {
  switch (mime) {
    case 'application/octet-stream':
      return 'File';
    default:
      return mime
  }
}

const FileCard: React.FC<FileCardProps> = ({
  file,
  onSelect,
  isSelected,
}) => {
  const { name,
    mime,
    size, } = file;
  return (
    <div

      onClick={() => onSelect(file)}
      className={` h-max
    max-w-[300px]
      group flex items-center gap-4
      rounded-xl border bg-white p-4
      shadow-sm transition-all
       hover:shadow-lg
cursor-pointer
      ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'}
    `}
    >
      <input
        type="checkbox"
        checked={isSelected}
        // onChange={() => onSelect(file)}
        className="
          form-checkbox h-5 w-5
          rounded text-blue-600
          transition duration-150 ease-in-out
          focus:ring-blue-500
        "
      />
      <div
        className="
        flex h-16 w-12 items-center justify-center
        rounded-lg bg-blue-50 text-blue-600
        group-hover:bg-blue-100
      ">
        {getFileIcon(mime)}
      </div>


      <div className="flex-1 overflow-hidden">
        <h3 className="truncate text-sm font-semibold text-gray-800">
          {name}
        </h3>
        <div className="mt-1 flex gap-3 text-xs text-gray-500">
          <span>{formatMime(mime)}</span>
          <span>•</span>
          <span>{formatSize(size)}</span>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
