// import { ArrowDown, ArrowUp, Plus, Trash } from "@strapi/icons";
import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';

import {
    Box,
    Button,
    Grid,
    TextInput,
    Textarea,
    Typography,
    Accordion,
    Checkbox,
    Divider,
} from "@strapi/design-system";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUp, Plus, Trash } from "lucide-react";


const modulePartLink = (documentId: string) => `/admin/content-manager/collection-types/api::module-part.module-part/${documentId}`
const questionLink = (documentId: string) => `/admin/content-manager/collection-types/api::question.question/${documentId}`
const optionLink = (documentId: string) => `/admin/content-manager/collection-types/api::option.option/${documentId}`

const RenderLink = (item: any, builder: (x: string) => string) => {
    if (!item.id) return <></>
    return <>
        <a
            href={builder(item.documentId)}
            target="_blank"


        >
            <Button>
                Link
            </Button>
        </a>
    </>
}

type Modules = {
    title: string;
    parts: ModuleParts[];
    content: string;
}

type ModuleParts = {
    documentId?: string;
    title: string;
    content: string;
    id: string;
    order: number;
    media: File[];
    questions?: Question[]
}
type Question = {
    title: string;
    options: Options[];
    media: string[];
    score: number;
}
type Options = {
    isCorrect: boolean;
    content: string;
}

type Course = {
    title: string;
    description: string;
    modules: Modules[]
}

export default function ModulePart({
    part,
    pIndex,
    mIndex,
    movePart,
    removePart,
    addOption,
    addQuestion,
    setCourse,
    course,
}: {
    part: ModuleParts, pIndex: number; mIndex: number;
    movePart: (direction: 1 | -1, pIndex: number, mIndex: number) => void;
    removePart: (pIndex: number, mIndex: number) => void;
    addOption: (mIndex: number, pIndex: number, qIndex: number) => void;
    addQuestion: (mIndex: number, pIndex: number) => void;
    setCourse: Dispatch<SetStateAction<Course>>;
    course: Course;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const processFiles = (event: ChangeEvent) => {
        const fileList = event.target.files as FileList;
        if (!fileList || fileList.length === 0) return;
        let filesToUpload: FileList = fileList;

        const newModules = [...course.modules];
        newModules[mIndex].parts[pIndex].media = Array.from(filesToUpload);
        setCourse({ ...course, modules: newModules });
    }

    const removeFile = (file: File, Index: number) => {
        const newModules = [...course.modules];
        newModules[mIndex].parts[pIndex].media =
            newModules[mIndex].parts[pIndex].media.slice(0, Index).concat(
                newModules[mIndex].parts[pIndex].media.slice(Index + 1)
            );
        setCourse({ ...course, modules: newModules });
    }
    
    return (
        <Box
            key={part.fakeId || part.id}
            marginTop={4}
            padding={4}
            background="neutral100"
            shadow="tableShadow"
            hasRadius
            display={'flex'}
            style={{ flexDirection: 'row', gap: 4 }}>
            {RenderLink(part, modulePartLink)}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 'auto',
                    width: '100%'
                }}
            >
                <div className='editor-wrapper'>

                    <TextInput
                        placeholder="Part Title"
                        value={part.title}
                        onChange={(e) => {
                            const newModules = [...course.modules];
                            newModules[mIndex].parts[pIndex].title = e.target.value
                            setCourse({ ...course, modules: newModules });
                        }}
                    />

                    {/* <CKEditor
                        key={part.documentId || pIndex}
                        editor={ClassicEditor}
                        config={{
                            licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjYxMDIzOTksImp0aSI6IjVhZDI2ZTUwLWQ2MWMtNGYxYy1hMGViLTdlMzRiZWMxOTJmYyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjQ2ZTYzMDZiIn0.aHxfdFv9cWLCWO3y4W8hxu5pBGVvBQka15n_SUw4lM68ybg0tLACx1cAowC-zVwOSMnXvEf1NkPeM1SverKScA',
                            plugins: [Essentials, Paragraph, Bold, Italic],
                            toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter'],
                        }}
                        data={part.content || ''}
                        onChange={(e, editor) => {
                            const newModules = [...course.modules];
                            newModules[mIndex].parts[pIndex].content = editor.getData();
                            setCourse({ ...course, modules: newModules });
                        }}
                    /> */}
                </div>

                <span style={{
                    flexWrap: 'wrap',
                    display: 'flex',
                    gap: 10
                }}>
                    <div
                        style={{
                            flexWrap: 'wrap',
                            display: 'flex',
                            gap: 10
                        }}>
                        {part.media && part.media.map((file, index) => {
                            return <span key={file.name}
                                style={{
                                    border: '1px solid white',
                                    borderRadius: 10,
                                    height: 'fit-content',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: 'fit-content'

                                }}>
                                <span style={{
                                    padding: 10,
                                }}>

                                    {file.name}
                                </span>
                                &nbsp;&nbsp;
                                <button
                                    disabled={Boolean(part.documentId)}
                                    onClick={() => {
                                        removeFile(file, index);
                                    }}
                                    style={{
                                        background: '#ff5f5fff',
                                        padding: 3,
                                        borderBottomRightRadius: 10,
                                        borderTopRightRadius: 10,

                                    }}
                                >X</button>
                            </span>
                        })}
                    </div>
                </span>
                {part.questions && (
                    <Box marginTop={4}>
                        <Typography variant="epsilon">Questions</Typography>
                        <Button
                            startIcon={<Plus />}
                            onClick={() => addQuestion(mIndex, pIndex)}
                            style={{ marginTop: 8 }}
                        >
                            Add Question
                        </Button>

                        {part.questions.map((q, qIndex) => (
                            <Box
                                key={qIndex}
                                marginTop={4}
                                padding={4}
                                background="neutral0"
                                shadow="filterShadow"
                                hasRadius
                            >
                                {RenderLink(q, questionLink)}
                                <TextInput
                                    placeholder={`Question ${qIndex + 1}`}
                                    value={q.title}
                                    onChange={(e) => {
                                        const newModules = [...course.modules];
                                        newModules[mIndex].parts[pIndex].questions[qIndex].title = e.target.value;
                                        setCourse({ ...course, modules: newModules });
                                    }}
                                />

                                <Box marginTop={4}>
                                    <Typography variant="pi">Options</Typography>
                                    <Button
                                        startIcon={<Plus />}
                                        onClick={() => addOption(mIndex, pIndex, qIndex)}
                                        style={{ marginTop: 4 }}
                                    >
                                        Add Option
                                    </Button>

                                    {q.options.map((op, oIndex) => (
                                        <Box key={oIndex} marginTop={4} padding={4} background="neutral100" hasRadius>

                                            <Grid.Item gap={2}>
                                                {RenderLink(op, optionLink)}
                                                <TextInput
                                                    placeholder={`Option ${oIndex + 1}`}
                                                    value={op.content}
                                                    onChange={(e) => {
                                                        const newModules = [...course.modules];
                                                        newModules[mIndex].parts[pIndex].questions[qIndex].options[oIndex].content = e.target.value;
                                                        setCourse({ ...course, modules: newModules });
                                                    }}
                                                />

                                                <Checkbox
                                                    checked={op.isCorrect}
                                                    onCheckedChange={(e) => {
                                                        const newModules = [...course.modules];
                                                        newModules[mIndex].parts[pIndex].questions[qIndex].options[oIndex].isCorrect = e as boolean;
                                                        setCourse({ ...course, modules: newModules });
                                                    }}
                                                >
                                                    Correct Answer
                                                </Checkbox>
                                            </Grid.Item>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Button
                    startIcon={<ArrowUp />}
                    onClick={() => movePart(-1, pIndex, mIndex)}
                    style={{ marginTop: 4 }}
                >
                </Button>

                <Button
                    startIcon={<ArrowDown />}
                    onClick={() => movePart(1, pIndex, mIndex)}
                    style={{ marginTop: 4 }}
                >
                </Button>

                <Button
                    startIcon={<Trash />}
                    onClick={() => removePart(pIndex, mIndex)}
                    style={{ marginTop: 4 }}
                >
                </Button>
            </div>

        </Box>
    )
}
