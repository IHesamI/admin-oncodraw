import { useRef, useState } from "react";
import BackEndApisServiceInstance from "../Api/ServerApis";
import { Upload } from "lucide-react";
import { File } from "../types";
import { useAlert } from "../Context/AlertContext";


const CHUNK_SIZE = 1 * 1024 * 1024

export default function ChunkUploader({
    handleUploadedFile,
    style = {},
    className = '',
}: {
    style?: React.CSSProperties;
    className?: string;
    handleUploadedFile: (file: File[]) => void;
}) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("idle");
    const [currentChunk, setCurrentChunk] = useState(0);
    const [totalChunks, setTotalChunks] = useState(0);
    const { showAlert } = useAlert();
    // const { del, get, post } = useFetchClient();
    const inputRef = useRef<HTMLInputElement>(null)
    const cachedFile = useRef<{
        file: File;
        fileId: string;
    }>(null);

    const uploadFile = async (file: File) => {
        const fileId = crypto.randomUUID();
        cachedFile.current = {
            file,
            fileId,
        };
        const chunks = Math.ceil(file.size / CHUNK_SIZE);

        setTotalChunks(chunks);
        setProgress(0);
        setStatus("uploading");
        setUploading(true);
        for (let i = 0; i < chunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const chunk = file.slice(start, end);

            try {
                await BackEndApisServiceInstance.uploadChunk(
                    chunk, fileId, i, chunks, file.name
                ).then(res => res.done ? handleUploadedFile(res.file) : null);
                const percent = Math.round(((i + 1) / chunks) * 100);
                setCurrentChunk(i + 1);
                setProgress(percent);
            } catch (err) {
                setStatus("error");
                showAlert({
                    message: err.message,
                    type: 'danger',
                    title: "Upload Failed!",
                    cancelText: 'Close'
                })
                return;
            }
        }
        setStatus("done");
    };

    const retry = async () => {
        const file = cachedFile.current!.file
        const chunks = Math.ceil(file.size / CHUNK_SIZE);
        const fileId = cachedFile.current!.fileId

        setTotalChunks(chunks);
        setProgress(((currentChunk + 1) / chunks) * 100);
        setStatus("uploading");
        setUploading(true)
        for (let i = currentChunk; i < chunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const chunk = file.slice(start, end);

            try {
                await BackEndApisServiceInstance.uploadChunk(
                    chunk, fileId, i, chunks, file.name
                ).then(res => res.done ? handleUploadedFile(res.file) : null);
                const percent = Math.round(((i + 1) / chunks) * 100);
                setCurrentChunk(i + 1);
                setProgress(percent);
            } catch (err) {
                showAlert({
                    message: err.message,
                    type: 'danger',
                    title: "Upload Failed!",
                    cancelText: 'Close'
                })
                setStatus("error");
                return;
            }
        }
        setStatus("done");
    };

    return (
        <>
            <div
            // style={styles.container}
            >
                {status === "idle" && <span
                    onClick={() => inputRef.current?.click()}
                    style={{
                        color: 'white',
                        ...style
                    }}
                    className={`flex flex-row items-center justify-between` + className}
                >
                    Select a file to Upload
                    &nbsp;

                    <Upload className="w-5 h-5" />
                </span>}
                {/* <br /> */}
                <input
                    ref={inputRef}
                    className="hidden"
                    style={{ width: 'none', display: 'none' }}
                    type="file"
                    multiple={false}
                    onChange={(e) => uploadFile(e.target.files![0])}
                />
                <div>
                    {status !== "idle" && (
                        <div style={styles.progressWrapper}>
                            <div style={styles.progressBar}>
                                <div
                                    style={{
                                        ...styles.progressFill,
                                        width: `${progress}%`,
                                    }}
                                />
                            </div>

                            <div className="flex flex-row">
                                <p>
                                    {status === "uploading" && (
                                        <>
                                            Uploading chunk {currentChunk} / {totalChunks} — {progress}%
                                        </>
                                    )}
                                    {status === "done" && "Upload complete ✅"}
                                    {status === "error" && <>
                                        Upload failed ❌
                                        <br />
                                        <button
                                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                retry()
                                            }}>
                                            Re-try
                                        </button>
                                    </>}
                                </p>
                                <button
                                    className="flex items-center gap-2 bg-blue-600 h-fit self-end text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                                    onClick={(e) => {
                                        setStatus('idle')
                                    }}>
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}


const styles = {
    container: {
        width: 400,
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: 20
    },
    progressWrapper: {
        marginTop: 15,
    },
    progressBar: {
        width: "100%",
        height: 10,
        background: "#eee",
        borderRadius: 5,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        background: "#4caf50",
        transition: "width 0.2s ease",
    },
};
