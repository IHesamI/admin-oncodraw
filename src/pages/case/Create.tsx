import React from 'react';
import CaseForm from '../../components/CaseForm';
import { Case } from '../../types';
import BackEndApisServiceInstance from '../../Api/ServerApis';

export default function CreateCase() {

  const handleSubmit = async (caseData: Partial<Case>) => {
    try {
      await BackEndApisServiceInstance.createCase(caseData);
      console.log('Case created successfully');
    } catch (error) {
      console.error('Error creating case:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Case</h1>
      <CaseForm
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
