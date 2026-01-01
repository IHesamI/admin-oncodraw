import { toast } from "react-toastify";
import { Case, Course, File, instructorData, ModulePart, ModuleProgress, Notification, Progress, Question, Rate, StoreType, Submission, User, UserProgress, UserProgressSubscription, User as UserType } from "../types";
import { modifyCourse, modifyPartsForProgress, modifyProgress } from "./services";
import { Form } from "react-router-dom";
class BackEndApisService {
  // Use Next.js API routes as proxy to avoid CORS issues
  private BASE_URL =
    import.meta.env.API_BASE_URL || process.env.API_BASE_URL || "https://server.oncodraw.com";
  private commonHeaders: RequestInit & ({ 'x-api-token': string } | any) = process.env.VITE_LOCALHOST_API_TOKEN ? {
    'x-api-token': (process.env.VITE_LOCALHOST_API_TOKEN as string)
  } : {}
  private cache: { [key: string]: any } = {};
  serviceImplementation = {};
  static Instance: BackEndApisService;
  public static REGISTRATION = {
    name: "backEndApisService",
    altName: "backEndApisService",
    create: () => {
      if (!BackEndApisService.Instance)
        BackEndApisService.Instance = new BackEndApisService();
      return BackEndApisService.Instance;
    },
  };

  getFile(file: File) {
    return this.BASE_URL + file.url;
  }

  private fetch(url: string, init: RequestInit) {

    url = `/${url}`.replaceAll("//", "/");
    const baseUrl = (this.BASE_URL + "/api/").replace(/\/$/, "");
    url = (baseUrl + url).replace(/\/$/, "");
    const result = fetch(url, init);
    return result;
  }

  private async fetchFiles(url: string, init: RequestInit): Promise<Blob> {
    url = `/${url}`.replaceAll("//", "/");
    const baseUrl = this.BASE_URL.replace(/\/$/, "");
    url = (baseUrl + url).replace(/\/$/, "");
    if (this.cache[url]) return this.cache[url]
    const result = await fetch(url, {
      ...init,
      headers: {
        ...init?.headers,
        "Content-type": "*",
        ...this.commonHeaders
      },
    });
    this.cache[url] = result.blob();
    return this.cache[url]
  }

  async handleAuthorizeGetAPI<T>(url: string, headers = {}, payload?: { withoutNotif?: boolean; ignoreCache?: boolean; }): Promise<T> {
    const defaultPayload = { withoutNotif: false, ignoreCache: false }
    const jwt = localStorage.getItem("jwt");
    const authObjec = jwt ? { Authorization: `Bearer ${jwt}` } : {}
    return this.get(url, {
      ...authObjec,
      ...headers,
    }, { ...defaultPayload, ...payload });
  }

  async handleAuthorizePostAPI<T>(
    url: string,
    data: string | FormData,
    headers = {}
  ): Promise<T> {
    const jwt = localStorage.getItem("jwt");
    return this.post(url, data, {
      Authorization: `Bearer ${jwt}`,
      ...headers,
    });
  }

  private async get<T>(
    url: string,
    headers = {},
    payload = {
      withoutNotif: false,
      ignoreCache: false
    }
  ): Promise<T> {

    if (!payload.ignoreCache && this.cache[url]) return this.cache[url];
    const result = await this.fetch(`${url}`, {
      method: "GET",
      headers: {
        ...headers,
        ...this.commonHeaders
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (!payload.ignoreCache && !this.cache[url]) this.cache[url] = result;
        return result;
      });

    if (result.error) {
      if (!payload.withoutNotif)
        toast(`Error: ${result.error.message}`, {
          type: "error",
        });
      throw new Error(result.error.message);
    }
    return result;
  }

  private async delete(url: string, body: FormData | string, headers = {}) {
    const jwt = localStorage.getItem("jwt");
    const result = await this.fetch(`${url}`, {
      method: "DELETE",
      body,
      headers: {
        ...headers,
        Authorization: `Bearer ${jwt}`,
        ...this.commonHeaders
      },
    }).then((res) => res.json());
    if (result.error) {
      toast(`Error: ${result.error.message}`, {
        type: "error",
      });
      throw new Error(result.error.message);
    }
    return result;
  }

  private async put(url: string, body: FormData | string, headers = {}) {
    const jwt = localStorage.getItem("jwt");
    const result = await this.fetch(`${url}`, {
      method: "PUT",
      body,
      headers: {
        ...headers,
        Authorization: `Bearer ${jwt}`,
        ...this.commonHeaders

      },
    }).then((res) => res.json());

    if (result.error) {
      toast(`Error: ${result.error.message}`, {
        type: "error",
      });
    }
    return result;
  }

  private async post(url: string, data: string | FormData, headers = {}) {
    const result = await this.fetch(`${url}`, {
      method: "POST",
      body: data as BodyInit,
      headers: {
        ...headers,
        ...this.commonHeaders

      },
    }).then((res) => res.json());
    if (result.error) {
      toast(`Error: ${result.error.message}`, {
        type: "error",
      });
      throw new Error(result.error.message);
    }
    return result;
  }

  async verifyUser(): Promise<StoreType> {
    const jwt = localStorage.getItem("jwt") as string;
    return this.handleAuthorizeGetAPI<StoreType>(
      "/instructor-dashboard",
      {
        Authorization: `Bearer ${jwt}`,
      },
      {
        withoutNotif: true,
      }
    ).then(res => {
      res.storage.files = res.storage.files ? res.storage.files : [];
      return res;
    });
  }

  async editProfile(
    data: Partial<UserType> & {
      password?: string;
      confirmed?: string;
    }
  ): Promise<{ user: UserType }> {
    return this.put("/user-api/edit-profile", JSON.stringify(data));
  }

  async loginUser(loginData: {
    email: string;
    password: string;
  }): Promise<{ user: UserType; jwt: string }> {
    const data = new FormData();
    data.append("email", loginData.email);
    data.append("password", loginData.password);
    return this.post("auth/login", data, {});
  }

  async addRate(review: { rating: number; comment: string }, course: Course): Promise<Rate> {
    const data = new FormData();
    data.append("rateCount", `${review.rating}`);
    data.append("title", review.comment);
    return this.handleAuthorizePostAPI(`/rates/add-rate/${course.documentId}`, data, {});
  }
  async getCoursesProgress(): Promise<UserProgress> {
    return this
      .handleAuthorizeGetAPI<UserProgress>('/progress/get-courses-progress')
      .then(modifyProgress);
  }

  async loginWithGoogle(
    credential: string
  ): Promise<{ user: UserType; jwt: string }> {
    const data = new FormData();
    data.append("credential", credential);
    return this.post("auth/google", data, {});
  }
  formCreator() {
    return new FormData();
  }

  async forgetPassword(email: string) {
    const form = this.formCreator();
    form.append("email", email);
    return this.post("auth/forget-password", form);
  }

  // async deleteSegmentation(segmentaionId: string) {
  //   this.delete(`segments/delete/${segmentaionId}`);
  // }

  downloadFiles(url: string): Promise<Blob> {
    url = `/${url}`.replaceAll("//", "/");
    return this.fetchFiles(url, {});
  }

  downloadAuthFiles(fileid: string | number, payload: File) {
    const url = `/upload/files/${fileid}`.replaceAll("//", "/");
    return this.handleAuthorizeGetAPI<{ url: string }>(url)
      .then(async (response) => {
        const blob = await this.downloadFiles(response.url)
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = downloadUrl;
        a.download = `${payload.name}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        return true;
      })
      .catch((error) => console.error("Download failed:", error));
  }
  async getCourses(withLimit?: boolean): Promise<Course[]> {
    return this.handleAuthorizeGetAPI(withLimit ? `/courses/get-courses?moreThan=1` : `/courses/get-courses`);
  }
  async getWebinars(): Promise<Course[]> {
    return this.handleAuthorizeGetAPI('/courses/get-courses?limit=1');
  }

  async signUp(signUpData: {
    userName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    fullName?: string;
    gender?: string;
    birthDate?: string;
    country?: string;
    province?: string;
    city?: string;
    educationLevel?: string;
    generalUniversity?: string;
    generalGraduatedYear?: string;
    specialtyUniversity?: string;
    specialtyGraduatedYear?: string;
    maritalStatus?: string;
    numberOfChildren?: string;
    medicalLicenseNumber?: string;
    nationalIdNumber?: string;
    major?: string;
  }): Promise<{ user: UserType; jwt: string }> {
    const data = new FormData();
    data.append("email", signUpData.email);
    data.append("password", signUpData.password);
    data.append("userName", signUpData.userName);
    if (signUpData.phoneNumber)
      data.append("phoneNumber", signUpData.phoneNumber);
    if (signUpData.fullName) data.append("fullName", signUpData.fullName);
    if (signUpData.gender) data.append("gender", signUpData.gender);
    if (signUpData.birthDate) data.append("birthDate", signUpData.birthDate);
    if (signUpData.country) data.append("country", signUpData.country);
    if (signUpData.province) data.append("province", signUpData.province);
    if (signUpData.city) data.append("city", signUpData.city);
    if (signUpData.educationLevel)
      data.append("educationLevel", signUpData.educationLevel);
    if (signUpData.generalUniversity)
      data.append("generalUniversity", signUpData.generalUniversity);
    if (signUpData.generalGraduatedYear)
      data.append("generalGraduatedYear", signUpData.generalGraduatedYear);
    if (signUpData.specialtyUniversity)
      data.append("specialtyUniversity", signUpData.specialtyUniversity);
    if (signUpData.specialtyGraduatedYear)
      data.append("specialtyGraduatedYear", signUpData.specialtyGraduatedYear);
    if (signUpData.maritalStatus)
      data.append("maritalStatus", signUpData.maritalStatus);
    if (signUpData.numberOfChildren)
      data.append("numberOfChildren", signUpData.numberOfChildren);
    if (signUpData.medicalLicenseNumber)
      data.append("medicalLicenseNumber", signUpData.medicalLicenseNumber);
    if (signUpData.nationalIdNumber)
      data.append("nationalIdNumber", signUpData.nationalIdNumber);
    (signUpData.major && data.append("major", signUpData.major))
    return this.post("auth/signup", data, {});
  }

  async handleSignUp(data: {
    email: string;
    password: string;
    userName: string;
    phoneNumber?: string;
    fullName?: string;
    gender?: string;
    birthDate?: string;
    country?: string;
    province?: string;
    city?: string;
    educationLevel?: string;
    generalUniversity?: string;
    generalGraduatedYear?: string;
    specialtyUniversity?: string;
    specialtyGraduatedYear?: string;
    maritalStatus?: string;
    numberOfChildren?: string;
    medicalLicenseNumber?: string;
    nationalIdNumber?: string;
    major?: string;
  }) {
    const result = await this.signUp(data);
    localStorage.setItem("jwt", result.jwt);
    return result.user;
  }


  async getCourse(courseDocumentId: string): Promise<Course> {
    return this.handleAuthorizeGetAPI<Course>(`/courses/get-course/${courseDocumentId}`).then(modifyCourse);
  }

  async getCoursePlayerData(courseDocumentId: string): Promise<Course> {
    return this.handleAuthorizeGetAPI<Course>(`/courses/get-course-player/${courseDocumentId}`).then(modifyCourse);
  }
  addNote(partID: string, text: string, course: Course) {
    const form = new FormData();
    form.append('text', text);
    return this.handleAuthorizePostAPI(`/notes/save/${course.documentId}/${partID}`, form);
  }

  async updateCourseProgress(course: Course, part: ModulePart) {
    const progress = await this.put(`/progress/update-courses-progress/${course.documentId}/${part.documentId}`, '') as ModuleProgress;
    const newCourse = { ...course }
    newCourse.progresses = newCourse.progresses.length == 0 ? [progress] : newCourse.progresses.map(item => {
      return item.id == progress.id ? progress : item;
    })
    return modifyPartsForProgress(newCourse)
  }
  async getLast5Notifs() {
    return this.handleAuthorizeGetAPI<Notification[]>(`/notifs/get/last-5/`);
  }
  async enrollCrouse(course: Course) {
    return this.handleAuthorizeGetAPI(`/courses/enroll-course/${course.documentId}`,
      {},
      {
        ignoreCache: true,
        withoutNotif: true,
      });
  }
  async getInstructorCourses() {
    return this.handleAuthorizeGetAPI<Course[]>(`/courses/get-instrcutor-courses/`);
  }
  async saveResponse(question: Question, payload: {
    optionId: string | number,
  }) {
    const form = new FormData();
    form.append('optionId', `${payload.optionId}`);
    return this.handleAuthorizePostAPI(`/response/save-reponse/${question.documentId}`, form,)
  }

  async uploadChunk(chunk: any, fileId: string, i: number, chunks: number, name: string) {
    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("fileId", fileId);
    formData.append("chunkIndex", `${i}`);
    formData.append("totalChunks", `${chunks}`);
    formData.append("fileName", name);
    return this.handleAuthorizePostAPI<{ done: boolean, file: File[] }>('instructor-dashboard/upload-file', formData);
  }
  async getFiles(): Promise<File[]> {
    return this.handleAuthorizeGetAPI('instructor-dashboard/get-files');
  }

  async getUsers(): Promise<User[]> {
    return this.handleAuthorizeGetAPI('/users-permissions/users');
  }

  async getInstructorDashboard(documentID: string) {
    return this
      .handleAuthorizeGetAPI<instructorData>(`courses/instrcutor/${documentID}`)
      .then((res) => {
        res.course = modifyCourse(res.course);
        return res;
      })
  }
  async deleteFiles(files: File[]): Promise<void> {
    const formData = new FormData();
    if (files.length) {
      formData.append('files', JSON.stringify(files));
      return this.handleAuthorizePostAPI(`instructor-dashboard/delete-files`, formData);
    }
  }

  async createCase(caseData: Partial<Case>): Promise<Case> {
    return this.handleAuthorizePostAPI('/case-types', JSON.stringify({ data: caseData }));
  }
}

const BackEndApisServiceInstance = BackEndApisService.REGISTRATION.create();
export default BackEndApisServiceInstance;
