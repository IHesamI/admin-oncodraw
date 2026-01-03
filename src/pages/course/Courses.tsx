import { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Case } from '../../types';
import { useNavigate } from 'react-router-dom';
import { getUserContext } from '../../UserContext';
// import { CaseListItem } from './CaseItem';


export function Courses() {
    const { courses } = getUserContext();
    // const [cases, setCases] = useState<Case[]>([]);
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Courses</h2>
                <button
                    onClick={() => navigate('/course/create')}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    New Course
                </button>
            </div>

            <div className="bg-white shadow-sm border-t-[1px] pt-[10px] border-gray-500">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody className="divide-y divide-gray-200">
                            {courses.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No Courses yet. Create your first Course!
                                    </td>
                                </tr>
                            ) : <>

                                {courses.map(course =>
                                    <div className='flex flex-row justify-between p-4 my-1'>
                                        <h1>{course.title}</h1>
                                        <div className='flex flex-col gap-1'>
                                            <button
                                                onClick={() => {
                                                    navigate(`/course/edit/${course.documentId}`)
                                                    // setCourse(state => {
                                                    //     state.instructors = state.instructors!.slice(0, index).concat(state.instructors!.slice(index + 1));
                                                    //     return { ...state };
                                                    // })
                                                }}
                                                className="inline-flex  justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    // setCourse(state => {
                                                    //     state.instructors = state.instructors!.slice(0, index).concat(state.instructors!.slice(index + 1));
                                                    //     return { ...state };
                                                    // })
                                                }}
                                                className="inline-flex  justify-center rounded-md border border-transparent bg-orange-600 py-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                                Review
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                                //    cases.map(item => <CaseListItem key={item.id} caseItem={item} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default Courses;
//   return (
//     <div>Courses</div>
//   )
// }
