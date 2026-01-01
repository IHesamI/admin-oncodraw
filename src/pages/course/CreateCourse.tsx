import React, { useState } from 'react';
import FileSelector from '../../components/FileSelector';
import { Course, Module, ModulePart } from '../../types';

export default function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState(0);
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [modules, setModules] = useState<Module[]>([]);

  const handleAddModule = () => {
    setModules([...modules, { id: Date.now(), title: '', parts: [] }]);
  };

  const handleRemoveModule = (id: number) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  const handleModuleChange = (id: number, title: string) => {
    setModules(
      modules.map((module) =>
        module.id === id ? { ...module, title } : module
      )
    );
  };

  const handleAddModulePart = (moduleId: number) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              parts: [...module.parts, { id: Date.now(), title: '', content: '', media: [] }],
            }
          : module
      )
    );
  };

  const handleRemoveModulePart = (moduleId: number, partId: number) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? { ...module, parts: module.parts.filter((part) => part.id !== partId) }
          : module
      )
    );
  };

  const handleModulePartChange = (
    moduleId: number,
    partId: number,
    field: string,
    value: string | File[]
  ) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              parts: module.parts.map((part) =>
                part.id === partId ? { ...part, [field]: value } : part
              ),
            }
          : module
      )
    );
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      title,
      description,
      category,
      difficulty,
      price,
      thumbnail,
      modules,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Difficulty</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail</label>
          <FileSelector onFileSelect={(file) => setThumbnail(file)} />
        </div>

        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">Modules</h2>
          {modules.map((module) => (
            <div key={module.id} className="mb-4 p-4 border rounded">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  placeholder="Module Title"
                  className="w-full p-2 border rounded"
                  value={module.title}
                  onChange={(e) => handleModuleChange(module.id, e.target.value)}
                />
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded ml-2"
                  onClick={() => handleRemoveModule(module.id)}
                >
                  Remove Module
                </button>
              </div>

              {module.parts.map((part) => (
                <div key={part.id} className="ml-4 my-2 p-2 border rounded">
                  <div className="flex justify-between items-center mb-2">
                    <input
                      type="text"
                      placeholder="Part Title"
                      className="w-full p-2 border rounded"
                      value={part.title}
                      onChange={(e) =>
                        handleModulePartChange(module.id, part.id, 'title', e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white p-2 rounded ml-2"
                      onClick={() => handleRemoveModulePart(module.id, part.id)}
                    >
                      Remove Part
                    </button>
                  </div>
                  <textarea
                    placeholder="Part Content"
                    className="w-full p-2 border rounded mb-2"
                    value={part.content}
                    onChange={(e) =>
                      handleModulePartChange(module.id, part.id, 'content', e.target.value)
                    }
                  />
                  <FileSelector
                    onFileSelect={(files) =>
                      handleModulePartChange(module.id, part.id, 'media', files)
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                className="bg-green-500 text-white p-2 rounded mt-2"
                onClick={() => handleAddModulePart(module.id)}
              >
                Add Module Part
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleAddModule}
          >
            Add Module
          </button>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Course
        </button>
      </form>
    </div>
  );
}
