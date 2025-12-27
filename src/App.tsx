import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { Dashboard } from './components/Dashboard';
import { Posts } from './components/Posts';
import { Files } from './components/Files';
import { Subscriptions } from './components/Subscriptions';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/posts"
          element={
            <AdminLayout>
              <Posts />
            </AdminLayout>
          }
        />
        <Route
          path="/files"
          element={
            <AdminLayout>
              <Files />
            </AdminLayout>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <AdminLayout>
              <Subscriptions />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
