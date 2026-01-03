import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Case, File, User } from '../types';
import ServerApis from '../Api/ServerApis';
import FileSelector from './FileSelector';
import { UserContext } from '../UserContext';
import * as XLSX from 'xlsx';
import { uuidv4 } from '../utils/commonServices';

const CaseForm = ({ initialData, handleSubmit }:
  {
    initialData?: Case,
    handleSubmit: (theCaseData: Partial<Case>) => void
  }
) => {
  const { user } = useContext(UserContext);
  // const [allUsers, setAllUsers] = useState<User[]>([]);
  const [participantEmails, setParticipantEmails] = useState<{ email: string, id: string }[]>(
    initialData ?
      initialData.participants :
      [{ email: '', id: uuidv4() }]);
  const participantsRef = useRef<HTMLInputElement>(null);
  const [caseData, setCaseData] = useState<Partial<Case>>(
    initialData || {
      title: '',
      teacher: user?.email,
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>(
    initialData && initialData.files ?
      initialData.files :
      []);




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

  const handleBeforeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let finalCaseData = { ...caseData };
      finalCaseData = {
        ...finalCaseData,
        participants: participantEmails.map(part => part.email),
      };

      handleSubmit(finalCaseData);
    } catch (error) {
      console.error('Error creating case:', error);
    }
  };

  const handleParticipantsFileEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        console.error('data')
        const emails = data.flat().filter((cell) => typeof cell === 'string' && cell.includes('@')) as string[];
        setParticipantEmails([
          ...participantEmails,
          ...emails.map((item: string) => ({ id: uuidv4(), email: item }))
        ]);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  return (
    <form onSubmit={handleBeforeSubmit} className="space-y-4">
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
          onSelectionChange={handleFileSelectionChange}
          selectedFiles={selectedFiles}
        />
      </div>

      <div>
        <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">Teacher</label>
        <input
          type="text"
          name="teacher"
          id="teacher"
          value={caseData.teacher as string}
          onChange={handleChange}
          className='border-[1px] border-gray-300'
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor="participants" className="block text-sm font-medium text-gray-700">Participants</label>
        {participantEmails.map((item, index) => {
          return <div key={item.id} className='my-[1px]'>
            <input
              onChange={(e) => {
                setParticipantEmails(state => {
                  state[index].email = e.target.value;
                  return [...state];
                });
              }}
              placeholder='Email'
              defaultValue={item.email}
              className='border-[1px] border-gray-300'
              type="email" />
            &nbsp;
            <button
              onClick={() => {
                setParticipantEmails(state => {
                  return state.slice(0, index).concat(state.slice(index + 1));
                })
              }}
              className="inline-flex  justify-center rounded-md border border-transparent bg-red-600 py-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Delete
            </button>
          </div>
        })}
        <button
          onClick={() => {
            setParticipantEmails(state => {
              // state.push('');
              return [...state, { email: '', id: uuidv4() }];
            })
          }}
           className="w-fit inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Add Participants
        </button>
        <input
          ref={participantsRef}
          type="file"
          name="participantsFile"
          id="participantsFile"
          onChange={handleParticipantsFileEnter}
          className='hidden'
        />
        or
        <button
          onClick={(e) => {
            e.preventDefault();
            participantsRef.current!.click();
          }}
          className="inline-flex justify-center w-fit rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Upload Participants
        </button>
      </div>
      <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Create Case
      </button>
    </form>
  );
};

export default CaseForm;
