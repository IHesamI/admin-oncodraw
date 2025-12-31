import React, { useState, useEffect } from 'react';
import { Case, File } from '../types';
import ServerApis from '../Api/ServerApis';

const CaseForm = () => {
  const [caseData, setCaseData] = useState<Partial<Case>>({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    eventDate: new Date(),
    isOpen: false,
    type: 'case-library',
    files: [],
  });
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const files = await ServerApis.getFiles();
        setFiles(files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    fetchFiles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setCaseData({ ...caseData, [name]: checked });
        return;
    }

    setCaseData({ ...caseData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    const selected = files.filter((file) => selectedOptions.includes(file.documentId));
    setSelectedFiles(selected);
    setCaseData({ ...caseData, files: selected });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ServerApis.createCase(caseData);
      console.log('Case created successfully');
    } catch (error) {
      console.error('Error creating case:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={caseData.title as string}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          id="description"
          value={caseData.description as string}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          value={caseData.category as string}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">Sub Category</label>
        <input
          type="text"
          name="subCategory"
          id="subCategory"
          value={caseData.subCategory as string}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
        <input
          type="date"
          name="eventDate"
          id="eventDate"
          value={caseData.eventDate ? new Date(caseData.eventDate).toISOString().split('T')[0] : ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="isOpen"
          id="isOpen"
          checked={caseData.isOpen}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="isOpen" className="ml-2 block text-sm text-gray-900">Is Open?</label>
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          id="type"
          value={caseData.type}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="case-library">Case Library</option>
          <option value="workshop">Workshop</option>
          <option value="both">Both</option>
        </select>
      </div>
      <div>
        <label htmlFor="files" className="block text-sm font-medium text-gray-700">Files</label>
        <select
          multiple
          name="files"
          id="files"
          onChange={handleFileChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {files.map((file) => (
            <option key={file.documentId} value={file.documentId}>
              {file.name}
            </option>
          ))}
        </select>
      </div>
       <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Create Case
      </button>
    </form>
  );
};

export default CaseForm;
