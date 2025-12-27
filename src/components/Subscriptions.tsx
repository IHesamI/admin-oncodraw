import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
// import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    plan: 'free',
    status: 'active',
    expires_at: '',
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  async function fetchSubscriptions() {
    // const { data, error } = await supabase
    //   .from('subscriptions')
    //   .select('*')
    //   .order('created_at', { ascending: false });

    // if (error) {
    //   console.error('Error fetching subscriptions:', error);
    //   return;
    // }

    // setSubscriptions(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      expires_at: formData.expires_at || null,
    };

    if (editingSub) {
      // const { error } = await supabase
      //   .from('subscriptions')
      //   .update(dataToSubmit)
      //   .eq('id', editingSub.id);

      // if (error) {
      //   console.error('Error updating subscription:', error);
      //   return;
      // }
    } else {
      // const { error } = await supabase
      //   .from('subscriptions')
      //   .insert([dataToSubmit]);

      // if (error) {
      //   console.error('Error creating subscription:', error);
      //   return;
      // }
    }

    setFormData({ email: '', plan: 'free', status: 'active', expires_at: '' });
    setIsCreating(false);
    setEditingSub(null);
    fetchSubscriptions();
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this subscription?')) return;

    // const { error } = await supabase
    //   .from('subscriptions')
    //   .delete()
    //   .eq('id', id);

    // if (error) {
    //   console.error('Error deleting subscription:', error);
    //   return;
    // }

    fetchSubscriptions();
  }

  function handleEdit(sub: Subscription) {
    setEditingSub(sub);
    setFormData({
      email: sub.email,
      plan: sub.plan,
      status: sub.status,
      expires_at: sub.expires_at ? sub.expires_at.split('T')[0] : '',
    });
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingSub(null);
    setFormData({ email: '', plan: 'free', status: 'active', expires_at: '' });
  }

  const planOptions = ['free', 'pro', 'enterprise'];
  const statusOptions = ['active', 'inactive', 'cancelled'];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Subscriptions</h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Subscription
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {editingSub ? 'Edit Subscription' : 'Create New Subscription'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {planOptions.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan.charAt(0).toUpperCase() + plan.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expires At (Optional)
                </label>
                <input
                  type="date"
                  value={formData.expires_at}
                  onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                {editingSub ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No subscriptions yet. Create your first subscription!
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {sub.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {sub.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          sub.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : sub.status === 'inactive'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {sub.expires_at ? new Date(sub.expires_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <button
                        onClick={() => handleEdit(sub)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
