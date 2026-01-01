import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getUserContext } from '../../UserContext';
import CaseForm from '../../components/CaseForm';
import BackEndApisServiceInstance from '../../Api/ServerApis';
import { Case } from '../../types';

export default function EditCase() {
    const { cases } = getUserContext();
    const { documentId } = useParams();
    const theCase = cases.find(item => item.documentId == documentId);
    // console.error(theCase, documentId)
    
    if (!theCase)
        return <span>No Case Found~</span>

    const handleSubmit = async (caseData: Partial<Case>) => {
        try {
            await BackEndApisServiceInstance.editCase(caseData);
            console.log('Case created successfully');
        } catch (error) {
            console.error('Error creating case:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Case</h1>
            <CaseForm
                initialData={theCase}
                handleSubmit={handleSubmit}
            />
        </div>)
}
