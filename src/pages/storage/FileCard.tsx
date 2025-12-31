import React from 'react';
import { File } from '../../types';
import {
  FileText,
  Image,
  Video,
  Music,
  File as FileIcon,
} from 'lucide-react';

type FileCardProps = Pick<File, 'mime' | 'name' | 'size'>;

const getFileIcon = (mime: string) => {
  if (mime.startsWith('image/')) return <Image size={24} />;
  if (mime.startsWith('video/')) return <Video size={24} />;
  if (mime.startsWith('audio/')) return <Music size={24} />;
  if (mime.includes('pdf')) return <FileText size={24} />;
  return <FileIcon size={24} />;
};

const formatSize = (bytes: number | string) => {
  const size = typeof bytes === 'string' ? parseInt(bytes) * 1000 : bytes * 1000;
  if (!size) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let value = size;
  while (value >= 1000 && i < units.length - 1) {
    value /= 1000;
    i++;
  }
  return `${value.toFixed(1)} ${units[i]}`;
};

const formatMime = (mime: string) => {
  switch (mime) {
    case 'application/octet-stream':
      return 'File';
    default:
      return mime
  }
}

const FileCard: React.FC<FileCardProps> = ({ name, mime, size }) => {
  return (
    <div className="
    max-w-[200px]
      group flex items-center gap-4
      rounded-xl border bg-white p-4
      shadow-sm transition-all
      hover:-translate-y-1 hover:shadow-lg
    ">
      <div className="
        flex h-12 w-12 items-center justify-center
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
