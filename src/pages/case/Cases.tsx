import { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Case } from '../../types';
import { useNavigate } from 'react-router-dom';
import { getUserContext } from '../../UserContext';
import { CaseListItem } from './CaseItem';


export function Cases() {
  const { cases } = getUserContext();
  // const [cases, setCases] = useState<Case[]>([]);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Cases</h2>
        <button
          onClick={() => navigate('/case/create')}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Case
        </button>
      </div>

      <div className="bg-white shadow-sm border-t-[1px] pt-[10px] border-gray-500">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              {cases.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No Cases yet. Create your first Case!
                  </td>
                </tr>
              ) : cases.map(item => <CaseListItem key={item.id} caseItem={item} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
