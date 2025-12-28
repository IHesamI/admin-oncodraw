import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';
import Loading from './components/Loading';
import { AdminLayout } from './components/AdminLayout';

const ProtectedRoute = ({ children }: { children?: JSX.Element }) => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('ProtectedRoute must be used within a UserProvider');
  }

  const { user, loading } = context;

  if (loading) {
    return <div className='w-full min-h-screen text-center flex justify-center items-center'><Loading /></div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  return <AdminLayout>
    <Outlet />
  </AdminLayout>
};

export default ProtectedRoute;
