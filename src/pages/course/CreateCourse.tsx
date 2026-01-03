import React, { useState } from 'react';
import FileSelector from '../../components/FileSelector';
import { Course, Module, ModulePart, Question } from '../../types';
import ModulePartComponent from '../../components/ModulePart';
import { uuidv4 } from '../../utils/commonServices';
import ReactQuill from 'react-quill';
import BackEndApisServiceInstance from '../../Api/ServerApis';
import CourseForm from '../../components/CourseForm';

export default function CreateCourse() {
  const handleSubmit = (course: Partial<Course>) => {
    BackEndApisServiceInstance
      .createCourse(course as Course);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      <CourseForm
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
