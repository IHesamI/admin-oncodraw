import React from 'react';

interface FileCardProps {
  name: string;
  type: string;
  size: string;
}

const FileCard: React.FC<FileCardProps> = ({ name, type, size }) => {
  return (
    <div className="file-card border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{name}</h3>
      <p>Type: {type}</p>
      <p>Size: {size}</p>
    </div>
  );
};

export default FileCard;
