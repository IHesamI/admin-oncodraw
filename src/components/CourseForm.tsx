import React, { useState } from 'react';
import FileSelector from '../components/FileSelector';
import { Course, Module, ModulePart, Question } from '../types';
// import ModulePartComponent from '../../components/ModulePart';
import { uuidv4 } from '../utils/commonServices';
import ReactQuill from 'react-quill';
import BackEndApisServiceInstance from '../Api/ServerApis';
import ModulePartComponent from './ModulePart';
export default function CourseForm({ initialCourse, handleSubmit }: {
  initialCourse?: Partial<Course>,
  handleSubmit: (course: Partial<Course>) => void;
}) {

  const [course, setCourse] = useState<Partial<Course>>(initialCourse || {
    title: "",
    description: "",
    modules: [],
    category: '',
    difficulty: 1,
    price: 0,

  });
  const addModule = () => {
    setCourse((c) => ({
      ...c,
      modules: [...c!.modules, { title: "", content: "", parts: [] }],
    }));
  };

  const addPart = (moduleIndex: number) => {
    const newModules = [...course.modules];
    newModules[moduleIndex].parts.push({
      fakeId: uuidv4(),
      title: "",
      content: "",
      media: [],
      order: newModules[moduleIndex].parts.length,
      questions: undefined,
      contents: [],
    });
    setCourse({ ...course, modules: newModules });
  };

  const addQuestion = (mIndex: number, pIndex: number) => {
    const newModules = [...course.modules];
    if (newModules[mIndex].parts[pIndex].questions) {
      (newModules[mIndex].parts[pIndex].questions).push({
        title: "",
        options: [],
        media: [],
        score: 1,
      })
    } else {
      newModules[mIndex].parts[pIndex].questions = [{
        title: "",
        options: [],
        media: [],
        score: 1,
      }];
    }
    setCourse({ ...course, modules: newModules });
  };


  const addOption = (m: number, p: number, q: number) => {
    const newModules = [...course.modules];
    (newModules[m].parts[p].questions as Question[])[q].options.push({ content: "", isCorrect: false });
    setCourse({ ...course, modules: newModules });
  };



  const movePart = (direction: 1 | -1, index: number, moduleIndex: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || course.modules![moduleIndex].parts.length <= newIndex) return;
    const newModules = [...course.modules];
    const temp = newModules[moduleIndex].parts[newIndex];
    newModules[moduleIndex].parts[newIndex] = newModules[moduleIndex].parts[index];
    newModules[moduleIndex].parts[index] = temp;
    setCourse({ ...course, modules: newModules });
  }

  const removePart = (moduleIndex: number, index: number,) => {
    const newModuleParts = [
      ...course.modules![moduleIndex].parts.slice(0, index),
      ...course.modules![moduleIndex].parts.slice(index + 1,)];
    const newModules = [...course.modules];
    newModules[moduleIndex].parts = newModuleParts;
    setCourse({ ...course, modules: newModules });
  }

  const handleModulePartChange = (mIndex: number, pIndex: number, key: keyof ModulePart, value: any) => {
    const newModules = [...course.modules];
    newModules[mIndex].parts[pIndex][key] = value;
    setCourse({ ...course, modules: newModules });
  }

  const updateCourse = <T extends keyof Course>(key: T, value: Course[T]) => {
    setCourse(state => ({ ...state, [key]: value }));
  }

  const handleRemoveModule = (mIndex: number) => {
    const newModules = [...course.modules];
    newModules.filter((_, index) => index != mIndex);
    setCourse({ ...course, modules: newModules });
  }

  const handleModuleChange = (mIndex: number, key: keyof Module, value: any) => {
    const newModules = [...course.modules];
    newModules[mIndex][key] = value;
    setCourse({ ...course, modules: newModules });
  }

  // const addOption = () => { }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(course)
      }}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={course.title}
            onChange={(e) => {
              updateCourse('title', e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Convenor</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={course.convenor}
            onChange={(e) => {
              updateCourse('convenor', e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Convenors Group</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={course.convenorsGroup}
            onChange={(e) => {
              updateCourse('convenorsGroup', e.target.value);
            }}
          />
        </div>
        {course.instructors!.map((item, index) => {
          return <div key={item.id} className='my-[1px]'>
            <input
              onChange={(e) => {
                setCourse(state => {
                  state.instructors![index].email = e.target.value;
                  return { ...state };
                });
              }}
              placeholder='Email'
              defaultValue={item.email}
              className='border-[1px] border-gray-300'
              type="email" />
            &nbsp;
            <button
              onClick={() => {
                setCourse(state => {
                  state.instructors = state.instructors!.slice(0, index).concat(state.instructors!.slice(index + 1));
                  return { ...state };
                })
              }}
              className="inline-flex  justify-center rounded-md border border-transparent bg-red-600 py-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Delete
            </button>
          </div>
        })}
        <button
          onClick={() => {
            setCourse(state => {
              state.instructors = [...state.instructors, { email: '', id: uuidv4() }];
              return { ...state }
            })
          }}
           className="w-fit inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Add Instructor
        </button>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <ReactQuill
            value={course.description as string}
            onChange={(value) => {
              updateCourse('description', value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Difficulty</label>
          <input
            min={1}
            max={10}
            defaultValue={1}
            type="number"
            className="w-full p-2 border rounded"
            value={course.difficulty}
            onChange={(e) => {
              updateCourse('difficulty', Number(e.target.value))
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={course.price}
            onChange={(e) => {
              updateCourse('price', Number(e.target.value))
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail</label>
          <FileSelector selectedFiles={[]} onSelectionChange={() => { }} />
        </div>

        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">Modules</h2>
          {course.modules!.map((module, mIndex) => (
            <div key={module.id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  placeholder="Module Title"
                  className="w-full p-2 border rounded"
                  value={module.title}
                  onChange={(e) => handleModuleChange(mIndex, 'title', e.target.value)}
                />
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded ml-2"
                  onClick={() => handleRemoveModule(mIndex)}
                >
                  Remove Module
                </button>
              </div>
              <h3 className="text-xl font-bold mb-4">Lessons</h3>
              {module.parts.map((part, index) => (<ModulePartComponent
                key={part.fakeId}
                pIndex={index}
                addOption={addOption}
                addQuestion={addQuestion}
                handleModulePartChange={handleModulePartChange}
                handleRemoveModulePart={removePart}
                part={part}
                mIndex={mIndex}
                setCourse={setCourse}
              />

              ))}
              <button
                type="button"
                className="bg-green-500 text-white p-2 rounded mt-2"
                onClick={() => addPart(mIndex)}
              >
                Add Lesson
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={addModule}
          >
            Add Module
          </button>
        </div>

        <button type="submit" className="bg-indigo-600 text-white p-2 rounded">
          submit
        </button>
      </form>
    </div>
  );
}
