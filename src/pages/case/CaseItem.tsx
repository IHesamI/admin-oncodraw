import { useNavigate, useRouteError } from "react-router-dom";
import { Case } from "../../types";
import { useEffect, useState } from "react";
import { Bookmark, CalendarDays, Clock, FileText, FlaskConical, ScanText, User, Users } from "lucide-react";

export const CaseListItem = ({
    caseItem,
}: {
    caseItem: Case;
}) => {

    // const { }
    // const router = useRouteError();
    const [isMounted, setIsMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isOwner = true;
    const hasAccess = true;
    const showUserContent = true;
    const isNotSignedIn = false
    const hasRoleButCaseClosed = false;

    // const handleParamClick = (value: string, field: SearchFieldOption) => {
    //     if (!value || value === "---" || !onSearchClick) return;
    //     onSearchClick(value, field);
    // };

    // const navigateToViewer = () => {
    //     if (!hasAccess) return;
    //     router.push(
    //         `/viewer/viewer?caseID=${caseItem.documentId}&StudyInstanceUIDs=${caseItem.StudyInstanceId}`
    //     );
    // };

    const {
        convenors,
        eventDescription,
        teacher,
        convenorsGroup,
        eventDate,
        schedules,
        tomurTypes,
        contourStructs,
        imageMods,
        files,
        eventConvenors,
    } = caseItem
    console.error('teacher', teacher)
    const teachers = teacher ? [teacher] : [];
    const teachersDisplay =
        teachers.length > 0
            ? teachers
                .map((t) => t.fullName || t.userName)
                .filter((name) => name && name.trim().length > 0)
                .join(", ") || "---"
            : "---";

    const displayedSchedules = Array.isArray(schedules) ? schedules : [];
    const hasSchedule = displayedSchedules.length > 0;

    // const eventStatus = getRemainingDaysStatus(eventDate);

    return (
        <article
            style={{ opacity: hasAccess && !hasRoleButCaseClosed ? 1 : 0.5 }}
            className="group relative overflow-hidden rounded-xl bg-[#000325] p-5 transition-colors duration-200 hover:bg-slate-700"
        >
            <div className="flex flex-wrap items-start justify-between gap-4 sm:flex-nowrap">
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <div className="flex items-center gap-2">
                        {caseItem.tag && (
                            <span className="w-fit inline-flex items-center rounded-md bg-purple-600 px-2.5 py-1 text-[11px] font-medium uppercase text-white">
                                {caseItem.tag}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-white">
                            {caseItem.title}
                        </h3>
                        <p className="text-sm text-slate-300">
                            {eventDescription ? eventDescription : null}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Bookmark className="h-4 w-4 text-purple-600" />
                            <span className="truncate">{caseItem.category ?? "---"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                    <div className="flex flex-col items-stretch gap-3 min-w-[90px]">
                        <button

                            className="w-full inline-flex items-center justify-center bg-main px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:cursor-not-allowed"
                        >
                            Review
                        </button>
                        <button
                            onClick={() => {
                                navigate(`/case/edit/${caseItem.documentId}`)
                            }}
                            className="w-full inline-flex items-center justify-center bg-main px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 disabled:cursor-not-allowed"
                        >
                            Edit
                        </button>
                    </div>
                    {/* {(!hasAccess || hasRoleButCaseClosed) && (
                        <span className="text-xs text-slate-400">
                            {isNotSignedIn
                                ? "Sign in to access this workshop"
                                : hasRoleButCaseClosed
                                    ? "Workshop is not open yet"
                                    : "Request access to join"}
                        </span>
                    )} */}
                </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
                <div className="rounded-lg border border-slate-700/70 bg-[#000646] p-4 transition-colors duration-200 group-hover:bg-slate-800">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                        {/* <UserPen className="h-4 w-4 text-slate-400" /> */}
                        <p className="mt-2 text-sm text-slate-200">
                            Instructor(s) :{" "}
                            {teachersDisplay !== "---" ? (
                                <button
                                    // onClick={() => handleParamClick(teachersDisplay, "teacher")}
                                    className="text-slate-200 hover:text-purple-400 transition-colors cursor-pointer underline-offset-2 hover:underline"
                                    type="button"
                                >
                                    {teachersDisplay}
                                </button>
                            ) : (
                                <span>{teachersDisplay}</span>
                            )}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                        <Users className="h-4 w-4 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-200">
                            Organizing Group :{" "}
                            {convenorsGroup && convenorsGroup !== "---" ? (
                                <button
                                    // onClick={() =>
                                    //     handleParamClick(convenorsGroup, "convenorsGroup")
                                    // }
                                    className="text-slate-200 hover:text-purple-400 transition-colors cursor-pointer underline-offset-2 hover:underline"
                                    type="button"
                                >
                                    {convenorsGroup}
                                </button>
                            ) : (
                                <span>---</span>
                            )}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                        <User className="h-4 w-4 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-200">
                            Scientific Secretary :{" "}
                            {convenors && convenors !== "---" ? (
                                <button
                                    // onClick={() => handleParamClick(convenors, "convenors")}
                                    className="text-slate-200 hover:text-purple-400 transition-colors cursor-pointer underline-offset-2 hover:underline"
                                    type="button"
                                >
                                    {convenors}
                                </button>
                            ) : (
                                <span>---</span>
                            )}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                        {/* <ShieldUser className="h-4 w-4 text-slate-400" /> */}
                        <p className="mt-2 text-sm text-slate-200">
                            Executive Secretary :{" "}
                            {eventConvenors && eventConvenors !== "---" ? (
                                <button
                                    // onClick={() =>
                                    //     handleParamClick(eventConvenors, "eventConvenors")
                                    // }
                                    className="text-slate-200 hover:text-purple-400 transition-colors cursor-pointer underline-offset-2 hover:underline"
                                    type="button"
                                >
                                    {eventConvenors}
                                </button>
                            ) : (
                                <span>---</span>
                            )}
                        </p>
                    </div>

                </div>

                <div className="rounded-lg border border-slate-700/70 bg-[#000646] p-4 transition-colors duration-200 group-hover:bg-slate-800">
                    <div className="rounded-md border border-purple-500/30 bg-[#000325]  p-2">
                        <div className="flex flex-row items-center gap-2">
                            <FileText className="h-5 w-5 text-purple-400" />
                            <span className="text-base font-semibold text-white">
                                Case Vignette :{" "}
                            </span>
                            {files ? (
                                <></>
                                // <FilesDisplay files={files} showUserContent={showUserContent} />
                            ) : (
                                <span className="text-sm text-slate-400">---</span>
                            )}
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-200">
                        <FlaskConical className="h-4 w-4 text-slate-400" />
                        <p className="text-sm text-slate-200">
                            Tumor Type : {tomurTypes ? tomurTypes : "---"}
                        </p>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-200">
                        <ScanText className="h-4 w-4 text-slate-400" />
                        <p className="text-sm text-slate-200">
                            Imaging Modalities : {imageMods ? imageMods : "---"}
                        </p>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-200">
                        <FlaskConical className="h-4 w-4 text-slate-400" />
                        <p className="text-sm text-slate-200">
                            Structures : {contourStructs ? contourStructs : "---"}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};