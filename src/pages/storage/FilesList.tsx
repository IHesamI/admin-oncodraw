import React from 'react';
import FileCard from '../../components/FileCard';
import { File } from '../../types';

const FilesList: React.FC = () => {
  const mockFiles: File[] = [
    { name: 'document.pdf', type: 'PDF', size: '1.2 MB' },
    { name: 'image.jpg', type: 'JPEG', size: '500 KB' },
    { name: 'archive.zip', type: 'ZIP', size: '10 MB' },
  ];

  return (
    <div className="files-list p-4 flex flex-col gap-4">
      {mockFiles.map((file) => (
        <FileCard
          key={file.name}
          name={file.name}
          type={file.type}
          size={file.size}
        />
      ))}
    </div>
  );
};

export default FilesList;
