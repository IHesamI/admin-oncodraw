import { File } from '../types';
import { formatSize } from '../pages/storage/services';



const StorageVisualizer = ({ totalStorage, files }: { totalStorage: number, files: File[] }) => {
  const usedStorage = files.length ? files.reduce((acc, file) => acc + file.size, 0) : 0;

  const percentage = files.length ? Math.min((usedStorage / totalStorage) * 100, 100) : 0;

  const getProgressBarColor = () => {
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-blue-600';
  };

  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-md space-y-4 border border-gray-200">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Storage</h3>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">{formatSize(usedStorage)}</span> used of {formatSize(totalStorage)}
          </p>
        </div>
        <span className="text-sm font-bold text-gray-600">{percentage.toFixed(1)}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ease-out ${getProgressBarColor()}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="text-xs text-gray-400">
          <p>Files: {files.length}</p>
        </div>
        <div className="text-xs text-right text-gray-400">
          <p>Remaining: {totalStorage - usedStorage > 0 ? formatSize(totalStorage - usedStorage) : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default StorageVisualizer;