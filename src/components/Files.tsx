import { useEffect, useState } from 'react';
import { Upload, Trash2, Download, FileIcon } from 'lucide-react';
// import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type FileRecord = Database['public']['Tables']['files']['Row'];

export function Files() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
    ensureBucketExists();
  }, []);

  async function ensureBucketExists() {
    // const { data: buckets } = await supabase.storage.listBuckets();
    // const bucketExists = buckets?.some(bucket => bucket.name === 'files');

    // if (!bucketExists) {
    //   await supabase.storage.createBucket('files', {
    //     public: true,
    //     fileSizeLimit: 52428800,
    //   });
    // }
  }

  async function fetchFiles() {
    // const { data, error } = await supabase
    //   .from('files')
    //   .select('*')
    //   .order('uploaded_at', { ascending: false });

    // if (error) {
    //   console.error('Error fetching files:', error);
    //   return;
    // }

    // setFiles(data || []);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);

    for (const file of Array.from(selectedFiles)) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // const { error: uploadError } = await supabase.storage
      //   .from('files')
      //   .upload(filePath, file);

      // if (uploadError) {
      //   console.error('Error uploading file:', uploadError);
      //   continue;
      // }

      // const { data: urlData } = supabase.storage
      //   .from('files')
      //   .getPublicUrl(filePath);

      // await supabase.from('files').insert([
      //   {
      //     filename: file.name,
      //     file_url: urlData.publicUrl,
      //     file_type: file.type,
      //     file_size: file.size,
      //   },
      // ]);
    }

    setUploading(false);
    e.target.value = '';
    fetchFiles();
  }

  async function handleDelete(file: FileRecord) {
    if (!confirm('Are you sure you want to delete this file?')) return;

    // const fileName = file.file_url.split('/').pop();
    // if (fileName) {
    //   await supabase.storage.from('files').remove([fileName]);
    // }

    // const { error } = await supabase
    //   .from('files')
    //   .delete()
    //   .eq('id', file.id);

    // if (error) {
    //   console.error('Error deleting file:', error);
    //   return;
    // }

    fetchFiles();
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Files</h2>
        <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
          <Upload className="w-5 h-5" />
          {uploading ? 'Uploading...' : 'Upload Files'}
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Filename
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No files uploaded yet. Upload your first file!
                  </td>
                </tr>
              ) : (
                files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <FileIcon className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{file.filename}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {file.file_type || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatFileSize(file.file_size)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(file.uploaded_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Download className="w-4 h-4 inline" />
                      </a>
                      <button
                        onClick={() => handleDelete(file)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
