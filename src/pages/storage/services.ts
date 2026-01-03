export const formatSize = (bytes: number | string) => {
  const size = typeof bytes === 'string' ? parseInt(bytes)  : bytes ;
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