import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Cases } from './pages/case/Cases';
import { Files } from './pages/storage/Files';
import { Subscriptions } from './components/Subscriptions';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';


import AlertContextProvider from './Context/AlertContext';
import CreateCase from './pages/case/Create';
import EditCase from './pages/case/CaseEdit';
import CreateCourse from './pages/course/CreateCourse';
import Courses from './pages/course/Courses';
import EditCourse from './pages/course/EditCourse';


function App() {
  return (
    <AlertContextProvider>
      <Router
      >
        <Routes
        >
          <Route
            element={<ProtectedRoute />}
          >
            <Route
              path="/"
              element={
                <Dashboard />
              }
            />
            <Route
              path="/cases"
              element={
                <Cases />
              }
            />
            <Route
              path="/courses"
              element={
                <Courses />
              }
            />
            <Route
              path="/case/create"
              element={
                <CreateCase />
              }
            />
            <Route
              path="/case/edit/:documentId"
              element={
                <EditCase />
              }
            />
            <Route
              path="/course/create"
              element={
                <CreateCourse />
              }
            />
            <Route
              path="/course/edit/:documentId"
              element={
                <EditCourse />
              }
            />
            <Route
              path="/files"
              element={
                <Files />
              }
            />
            <Route
              path="/subscriptions"
              element={

                <Subscriptions />
              }
            />
          </Route>
          <Route path="/sign-in" element={<Login />} />

        </Routes>
      </Router>
    </AlertContextProvider>
  );
}

export default App;
