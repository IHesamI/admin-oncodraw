import { ReactNode } from 'react';
import { LayoutDashboard, FileText, Upload, Users } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: 'dashboard' | 'posts' | 'files' | 'subscriptions';
  onNavigate: (page: 'dashboard' | 'posts' | 'files' | 'subscriptions') => void;
}

export function AdminLayout({ children, currentPage, onNavigate }: AdminLayoutProps) {
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'posts' as const, label: 'Posts', icon: FileText },
    { id: 'files' as const, label: 'Files', icon: Upload },
    { id: 'subscriptions' as const, label: 'Subscriptions', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
