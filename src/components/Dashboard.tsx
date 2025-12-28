import { useEffect, useState } from 'react';
import { FileText, Upload, Users, TrendingUp, Database } from 'lucide-react';
// import { supabase } from '../lib/supabase';

export function Dashboard() {
  const [stats, setStats] = useState({
    posts: 0,
    files: 0,
    subscriptions: 0,
    storage:0,
  });

  useEffect(() => {
    async function fetchStats() {
      // const [postsResult, filesResult, subsResult] = await Promise.all([
      //   supabase.from('posts').select('id', { count: 'exact', head: true }),
      //   supabase.from('files').select('id', { count: 'exact', head: true }),
      //   supabase.from('subscriptions').select('id', { count: 'exact', head: true }),
      // ]);

      // setStats({
      //   posts: postsResult.count || 0,
      //   files: filesResult.count || 0,
      //   subscriptions: subsResult.count || 0,
      // });
    }

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Posts', value: stats.posts, icon: FileText, color: 'bg-blue-500' },
    { label: 'Total Files', value: stats.files, icon: Upload, color: 'bg-green-500' },
    { label: 'Subscriptions', value: stats.subscriptions, icon: Users, color: 'bg-orange-500' },
    { label: 'Storage', value: stats.storage, icon: Database, color: 'bg-yellow-500' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Welcome to Admin Panel</h3>
        </div>
        <p className="text-gray-600">
          Manage your posts, files, and subscriptions from the navigation menu.
        </p>
      </div>
    </div>
  )
}
