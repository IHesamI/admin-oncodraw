import React from 'react'
import CourseForm from '../../components/CourseForm'
import { getUserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import BackEndApisServiceInstance from '../../Api/ServerApis';
import { Case, Course } from '../../types';

export default function EditCourse() {
  const { courses } = getUserContext();
  const { documentId } = useParams();
  const theCourses = courses.find(item => item.documentId == documentId);
  // console.error(theCase, documentId)

  const handleSubmit = async (caseData: Partial<Course>) => {
    try {
      await BackEndApisServiceInstance.editCourse(caseData);
      console.log('Case created successfully');
    } catch (error) {
      console.error('Error creating case:', error);
    }
  };


  if (!theCourses)
    return <span>No Course Found~</span>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <CourseForm
        initialCourse={theCourses}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
