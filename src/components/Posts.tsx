import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Post = Database['public']['Tables']['posts']['Row'];

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    published: false,
  });

  // useEffect(() => {
  //   fetchPosts();
  // }, []);



  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();

  //   if (editingPost) {
  //     const { error } = await supabase
  //       .from('posts')
  //       .update({
  //         ...formData,
  //         updated_at: new Date().toISOString(),
  //       })
  //       .eq('id', editingPost.id);

  //     if (error) {
  //       console.error('Error updating post:', error);
  //       return;
  //     }
  //   } else {
  //     const { error } = await supabase
  //       .from('posts')
  //       .insert([formData]);

  //     if (error) {
  //       console.error('Error creating post:', error);
  //       return;
  //     }
  //   }

  //   setFormData({ title: '', content: '', author: '', published: false });
  //   setIsCreating(false);
  //   setEditingPost(null);
  //   fetchPosts();
  // }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    // // const { error } = await supabase
    //   .from('posts')
    //   .delete()
    //   .eq('id', id);

    // if (error) {
    //   console.error('Error deleting post:', error);
    //   return;
    // }

    // // fetchPosts();
  }

  function handleEdit(post: Post) {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      published: post.published,
    });
    setIsCreating(true);
  }

  function handleCancel() {
    setIsCreating(false);
    setEditingPost(null);
    setFormData({ title: '', content: '', author: '', published: false });
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Posts</h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {editingPost ? 'Edit Post' : 'Create New Post'}
          </h3>
          <form onSubmit={() => { }}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <div className="bg-white">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  modules={modules}
                  className="h-64 mb-12"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Published</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                {editingPost ? 'Update' : 'Create'}
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
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No posts yet. Create your first post!
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {post.author || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${post.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
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
