import { useState } from 'react';
import { AdminLayout } from './components/AdminLayout';
import { Dashboard } from './components/Dashboard';
import { Posts } from './components/Posts';
import { Files } from './components/Files';
import { Subscriptions } from './components/Subscriptions';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'posts' | 'files' | 'subscriptions'>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'posts':
        return <Posts />;
      case 'files':
        return <Files />;
      case 'subscriptions':
        return <Subscriptions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </AdminLayout>
  );
}

export default App;
