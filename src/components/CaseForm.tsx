import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Case, File } from '../types';
import ServerApis from '../Api/ServerApis';
import FileSelector from './FileSelector';

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
    StudyInstanceId: '',
    tag: '',
    tab1Title: '',
    tab2Title: '',
    tab3Title: '',
    convenors: '',
    tomurTypes: '',
    eventDescription: '',
    convenorsGroup: '',
    imageMods: '',
    contourStructs: '',
    eventConvenors: '',
    tab1Content: '',
    tab2Content: '',
    tab3content: '',
    showIn: 'develop',
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

  const handleFileSelectionChange = (newSelectedFiles: File[]) => {
    setSelectedFiles(newSelectedFiles);
    setCaseData({ ...caseData, files: newSelectedFiles });
  };

  const handleContentChange = (name: string, value: string) => {
    setCaseData({ ...caseData, [name]: value });
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
          className={'form-input'}
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
          className={'form-input'}
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
          className={'form-input'}
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
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="StudyInstanceId" className="block text-sm font-medium text-gray-700">Study Instance ID</label>
        <input
          type="text"
          name="StudyInstanceId"
          id="StudyInstanceId"
          value={caseData.StudyInstanceId as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag</label>
        <input
          type="text"
          name="tag"
          id="tag"
          value={caseData.tag as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="tab1Title" className="block text-sm font-medium text-gray-700">Tab 1 Title</label>
        <input
          type="text"
          name="tab1Title"
          id="tab1Title"
          value={caseData.tab1Title as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="tab1Content" className="block text-sm font-medium text-gray-700">Tab 1 Content</label>
        <ReactQuill
          value={caseData.tab1Content as string}
          onChange={(value) => handleContentChange('tab1Content', value)}
        />
      </div>
      <div>
        <label htmlFor="tab2Title" className="block text-sm font-medium text-gray-700">Tab 2 Title</label>
        <input
          type="text"
          name="tab2Title"
          id="tab2Title"
          value={caseData.tab2Title as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="tab2Content" className="block text-sm font-medium text-gray-700">Tab 2 Content</label>
        <ReactQuill
          value={caseData.tab2Content as string}
          onChange={(value) => handleContentChange('tab2Content', value)}
        />
      </div>
      <div>
        <label htmlFor="tab3Title" className="block text-sm font-medium text-gray-700">Tab 3 Title</label>
        <input
          type="text"
          name="tab3Title"
          id="tab3Title"
          value={caseData.tab3Title as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="tab3content" className="block text-sm font-medium text-gray-700">Tab 3 Content</label>
        <ReactQuill
          value={caseData.tab3content as string}
          onChange={(value) => handleContentChange('tab3content', value)}
        />
      </div>
      <div>
        <label htmlFor="convenors" className="block text-sm font-medium text-gray-700">Convenors</label>
        <input
          type="text"
          name="convenors"
          id="convenors"
          value={caseData.convenors as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="tomurTypes" className="block text-sm font-medium text-gray-700">Tomur Types</label>
        <input
          type="text"
          name="tomurTypes"
          id="tomurTypes"
          value={caseData.tomurTypes as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Event Description</label>
        <input
          type="text"
          name="eventDescription"
          id="eventDescription"
          value={caseData.eventDescription as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="convenorsGroup" className="block text-sm font-medium text-gray-700">Convenors Group</label>
        <input
          type="text"
          name="convenorsGroup"
          id="convenorsGroup"
          value={caseData.convenorsGroup as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="imageMods" className="block text-sm font-medium text-gray-700">Image Mods</label>
        <input
          type="text"
          name="imageMods"
          id="imageMods"
          value={caseData.imageMods as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="contourStructs" className="block text-sm font-medium text-gray-700">Contour Structs</label>
        <input
          type="text"
          name="contourStructs"
          id="contourStructs"
          value={caseData.contourStructs as string}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
      <div>
        <label htmlFor="eventConvenors" className="block text-sm font-medium text-gray-700">Event Convenors</label>
        <input
          type="text"
          name="eventConvenors"
          id="eventConvenors"
          value={caseData.eventConvenors as string}
          onChange={handleChange}
          className={'form-input'}
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
          className={'form-input'}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="isOpen" className="mr-2 block text-sm text-gray-900">Is Open</label>

        <input
          type="checkbox"
          name="isOpen"
          id="isOpen"
          checked={caseData.isOpen}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          id="type"
          value={caseData.type}
          onChange={handleChange}
          className={'form-input'}
        >
          <option value="case-library">Case Library</option>
          <option value="workshop">Workshop</option>
          <option value="both">Both</option>
        </select>
      </div>
      <div>
        <label htmlFor="showIn" className="block text-sm font-medium text-gray-700">Show In</label>
        <select
          name="showIn"
          id="showIn"
          value={caseData.showIn}
          onChange={handleChange}
          className={'form-input'}
        >
          <option value="develop">Develop</option>
          <option value="main">Main</option>
        </select>
      </div>
      <div>
        <label htmlFor="files" className="block text-sm font-medium text-gray-700">Files</label>
        <FileSelector
          availableFiles={files}
          selectedFiles={selectedFiles}
          onSelectionChange={handleFileSelectionChange}
        />
      </div>
      <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Create Case
      </button>
    </form>
  );
};

export default CaseForm;
