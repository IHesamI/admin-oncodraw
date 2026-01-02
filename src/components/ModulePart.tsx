import React, { Dispatch, SetStateAction } from 'react'
// import FileSelector from './FileSelector'
import { Course, ModulePart } from '../types'
import ReactQuill from 'react-quill';
import FileSelector from './FileSelector';

export default function ModulePartComponent({
    part,
    handleModulePartChange,
    handleRemoveModulePart,
    pIndex,
    mIndex,
    addQuestion,
    addOption,
    setCourse,
}: {
    addQuestion: (mIndex: number, pIndex: number) => void;
    part: ModulePart;
    pIndex: number;
    mIndex: number;
    handleModulePartChange: (mIndex: number, pIndex: number, key: keyof ModulePart, value: any) => void;
    handleRemoveModulePart: (mIndex: number, pIndex: number) => void;
    addOption: (m: number, p: number, q: number) => void;
    setCourse: Dispatch<SetStateAction<Partial<Course>>>;
}) {
    return (
        <div key={part.id} className="ml-4 my-2 p-2 border rounded">
            <div className="flex justify-between items-center mb-2">
                <input
                    type="text"
                    placeholder="Lesson Title"
                    className="w-full p-2 border rounded"
                    value={part.title}
                    onChange={(e) => {
                        handleModulePartChange(mIndex, pIndex, 'title', e.target.value)
                    }}
                />
                <button
                    type="button"
                    className="bg-red-500 text-white h-fit p-2 rounded ml-2"
                    onClick={() => handleRemoveModulePart(mIndex, pIndex)}
                >
                    Remove Lesson
                </button>
            </div>
            <ReactQuill
                value={part.content as string}
                onChange={(value) => {
                    handleModulePartChange(mIndex, pIndex, 'content', value);
                }}
                placeholder='Lesson Description'
            />
            <br />
            <br />
            <button
                type="button"
                className="bg-indigo-500 text-white p-2 mb-2 rounded ml-2 h-fit"
                onClick={() => {
                    setCourse(course => {
                        course.modules![mIndex].parts[pIndex].contents = [...course.modules![mIndex].parts[pIndex].contents, {
                            content: '',
                            media: null,
                            __component:"media-with-text.media-text",
                        }]
                        return { ...course };

                    })
                }}
            >
                Add Media Content
            </button>

            <div>
                {part.contents?.map((item, index) => {
                    return <div key={`${item.id}-${index}`}className="ml-4 my-2 p-2 border rounded">
                        <ReactQuill
                            defaultValue={
                                item.content
                            }
                            onChange={(value) => {
                                setCourse((course) => {
                                    course.modules![mIndex].parts![pIndex]
                                        .contents![index].content = value;
                                    return { ...course };
                                })
                            }}
                        />
                        <FileSelector
                            isSingle
                            selectedFiles={part.contents![index].media ? [part.contents![index].media] : []}
                            onSelectionChange={(files) => {
                                setCourse((course) => {
                                    course.modules![mIndex].parts[pIndex]
                                        .contents![index].media = files[files.length - 1];
                                    return { ...course };
                                });

                            }}
                        />
                    </div>
                })}
            </div>
            <br />
            <button
                type="button"
                className="bg-green-500 mt-2 text-white p-2 rounded ml-2 h-fit"
                onClick={() => addQuestion(mIndex, pIndex)}
            >
                Add Question
            </button>
            {part.questions ? <>
                {part.questions.map((question, qIndex) => 
                <div key={`${question.id}-${qIndex}`} className="ml-4 my-2 p-2 border rounded">
                    <div className='flex flex-row mb-1'>
                        <input
                            type="text"
                            placeholder="Question Title"
                            className="w-full p-2 border rounded"
                            value={question.title}
                            onChange={(e) => {
                                handleModulePartChange(mIndex, pIndex, 'title', e.target.value)
                            }}
                        />
                        <button
                            type="button"
                            className="bg-red-500 text-white h-fit rounded ml-2"
                            onClick={() => {
                                setCourse(course => {
                                    course.modules![mIndex].parts[pIndex].questions
                                        = course.modules![mIndex].parts[pIndex]
                                            .questions.filter((_, index) => qIndex != index);
                                    return { ...course };

                                })
                            }}
                        >
                            Remove Question
                        </button>
                    </div>
                    <button
                        type="button"
                        className="bg-green-500 text-white p-2 rounded ml-2"
                        onClick={() => addOption(mIndex, pIndex, qIndex)}
                    >
                        Add Option
                    </button>
                    {question.options.map((option, oIndex) =>
                        <div key={part.id} className="flex flex-row ml-4 my-2 p-2 border rounded items-center">
                            <ReactQuill
                                // type="text"
                                defaultValue={
                                    option.content
                                }
                                onChange={(value) => {
                                    setCourse((course) => {
                                        // const newModules = [...course.modules];
                                        course.modules![mIndex].parts[pIndex]
                                            .questions[qIndex]
                                            .options[oIndex].content = value;
                                        return { ...course };
                                    })
                                }}
                            />
                            <label>&nbsp;Is Correct? &nbsp;</label>
                            <input
                                type='checkbox'
                                checked={option.isCorrect}
                                onChange={(e) => {
                                    setCourse((course) => {
                                        course.modules![mIndex].parts[pIndex]
                                            .questions[qIndex]
                                            .options[oIndex].isCorrect = e.target.checked;
                                        return { ...course };
                                    })
                                }}
                            />
                            <button
                                type="button"
                                className="bg-red-500 text-white p-2 rounded ml-2 h-fit"
                                onClick={() => {
                                    setCourse(course => {
                                        course.modules![mIndex].parts[pIndex].questions[qIndex].options
                                            = course.modules![mIndex].parts[pIndex].questions[qIndex]
                                                .options.filter((_, index) => oIndex != index);
                                        return { ...course };

                                    })
                                }}
                            >
                                Remove Option
                            </button>
                        </div>)}
                </div>)}
            </> : <>
            </>}
        </div>
    )
}
