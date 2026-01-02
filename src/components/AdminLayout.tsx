import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Upload, Users, PersonStanding, Users2, User } from 'lucide-react';
import { getUserContext } from '../UserContext';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { user, } = getUserContext()
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'cases', label: 'Cases', icon: FileText, path: '/cases' },
    { id: 'courses', label: 'Courses', icon: FileText, path: '/courses' },
    { id: 'files', label: 'Files', icon: Upload, path: '/files' },
    { id: 'subscriptions', label: 'Subscriptions', icon: Users, path: '/subscriptions' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#000325] border-r flex flex-col justify-between pb-2 border-gray-200 fixed h-full">
        <div>
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-main">OncoRealm Panel</h1>
          </div>
          <nav className="p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${isActive
                    ? 'bg-main text-white'
                    : 'text-white hover:text-black hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <span className='flex flex-row gap-[10px] text-center w-full'>
          <User className="w-5 h-5 text-white" />
          <span className="font-medium text-white">{user?.username}</span>
        </span>
      </aside>
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
