import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Cases } from './pages/case/Cases';
import { Files } from './pages/storage/Files';
import { Subscriptions } from './components/Subscriptions';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';


import AlertContextProvider from './Context/AlertContext';


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
