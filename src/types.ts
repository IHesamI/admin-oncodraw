import { ApiCourseCourse, ApiModulePartModulePart, ApiModuleModule, ApiPlanPlan, ApiQuestionQuestion, ApiSubscriptionSubscription, PluginUsersPermissionsUser, ApiOptionOption, ApiProgressProgress, ApiCaseTypeCaseType } from "./contentTypes";

export interface CourseInfo {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  category: string;
  difficulty: string;
  image: string;
}

export interface Session {
  title: string;
  thumbnail: string;
}



export interface Lesson {
  title: string;
  duration: string;
  completed: boolean;
}


export interface CourseContent {
  title: string;
  modules: Module[];
}

export interface CoursePerformance {
  totalStudents: number;
  averageRating: number;
  enrollmentTrends: { month: string; students: number }[];
}

export interface PendingTask {
  id: number;
  task: string;
  course: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  course: string;
}


export interface Notification {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: null;
  locale: null;
}


export interface Note {
  id: number
  documentId: string
  text: string
  createdAt: string
  updatedAt: string
  publishedAt: any
  locale: any
}

export interface Gamification {
  points: number;
  badges: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Submission {
  id: number;
  studentName: string;
  submissionText: string;
  grade: number | null;
  feedback: string | null;
}

export interface Course {
  isWebinar: boolean;
  id: number;
  documentId: string
  title: string
  category: any
  difficulty: number;
  price: any
  modules: Module[];
  mappedDiffiuclty: {
    predicate: (diff: number) => boolean;
    value: string;
    title: string;
  };
  rates: Rate[]
  instructors: User[];
  thumbnail: File;
  rating: number;
  isFree?: boolean;
  hasAccess: boolean;
  description: string;
  progresses: ({ parts: { id: number }[] & Omit<Progress, 'parts'> })[];
  instructor?: string;
  convenorsGroup?: string;
  convenor?: string;
}

export interface Module {
  id: number;
  documentId: string;
  title: string;
  parts: ModulePart[];
}

export interface Rate {
  id: number
  documentId: string
  rateCount: number
  createdAt: string
  updatedAt: string
  publishedAt: any
  locale: any
  title: string
  owner: User
}

export interface File {
  id: number
  documentId: string
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  folderPath: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: any
}

export interface Formats {
  thumbnail: Thumbnail2
}

export interface Thumbnail2 {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  sizeInBytes: number
}



export type User = PluginUsersPermissionsUser['attributes'];

export type ExtendedModuleType = {
  isCompleted?: boolean
}
// export type Module = ApiModuleModule['attributes'];
export type ModulePart = {
  id: number
  documentId: string
  title: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: any
  locale: any
  questions: Question[];
  media: File[];
  notes: Note[];
  contents?: Content[];
} & ExtendedModuleType
export type Plan = ApiPlanPlan['attributes'];
export type Question = ApiQuestionQuestion['attributes'];
export type Option = ApiOptionOption['attributes'];
export type ModuleProgress = ApiProgressProgress['attributes'];
export interface UserProgress {
  id: number;
  documentId: string;
  subscriptions: UserProgressSubscription[];
}

export interface Progress {
  id: number
  documentId: string
  totalTime: any
  createdAt: string
  updatedAt: string
  publishedAt: any
  locale: any
  parts: {
    count: number
  };
}

export interface UserProgressSubscription {
  id: number;
  documentId: string;
  startTime: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: any;
  locale: any;
  courses?: (Course & {
    modules: ({ parts: { count: number } })[];
    progresses: Progress[];
    totalParts: number;
    totalProgresses: number;
    instructors: User[];
  })[];
  owner: User;
}

export interface Content {
  __component: string;
  id: number;
  content: string;
  media: File;
}

export type instructorData = {
  courses: Course[],
  enrolled: UserProgressSubscription[];
  files: File[],
}

export type alertProps = {
  title: string;
  message: string;
  onConfirm?: (x: any) => void;
  onCancel?: (x: any) => void;
  confirmText?: string;
  cancelText?: string;
  type: 'danger' | 'info' | 'success';
  isOpen: boolean
};

type withId = {
  id: number;
  documentId: string;
}

export type Subscription = ApiSubscriptionSubscription['attributes'] & withId;
export type Case = ApiCaseTypeCaseType['attributes'] & withId;

export type StoreType = {
  user: User | null,
  storage: {
    files: File[],
    totalStorage: number;
  },
  cases: Case[],
  courses: Course[],
}

