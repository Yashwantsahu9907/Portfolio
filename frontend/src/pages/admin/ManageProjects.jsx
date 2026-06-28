import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Loader2, ExternalLink, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import api, { API_URL } from '../../services/api';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '', desc: '', image: '', category: 'Full Stack', tags: '', demoUrl: '', githubUrl: ''
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: '', desc: '', image: '', category: 'Full Stack', tags: '', demoUrl: '', githubUrl: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      desc: project.desc,
      image: project.image,
      category: project.category,
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags,
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || ''
    });
    setIsModalOpen(true);
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/')) {
      return `${API_URL}${url}`;
    }
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/d\/(.+?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    return url;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileData = new FormData();
    fileData.append('image', file);

    setUploadingImage(true);
    try {
      const res = await api.post('/upload', fileData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, image: res.data }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : formData.tags
      };

      if (editingId) {
        await api.put(`/admin/projects/${editingId}`, payload);
        toast.success('Project updated successfully');
      } else {
        await api.post('/admin/projects', payload);
        toast.success('Project added successfully');
      }
      
      setIsModalOpen(false);
      setFormData({ title: '', desc: '', image: '', category: 'Full Stack', tags: '', demoUrl: '', githubUrl: '' });
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await api.delete(`/admin/projects/${id}`);
      toast.success('Project deleted');
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete project');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Manage Projects</h2>
          <p className="text-sm text-gray-400">Add, edit, or remove your portfolio projects.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Project Details</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Links</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No projects found. Create your first one!
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={getImageUrl(project.image)} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <div className="font-semibold text-white mb-1">{project.title}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{project.desc}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium border border-primary/20">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(project)}
                          className="p-2 text-gray-400 hover:text-primary transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(project._id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Project' : 'Create New Project'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-lg text-white" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea required name="desc" rows="3" value={formData.desc} onChange={handleChange} className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-lg text-white resize-none"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Project Image (URL or Upload)</label>
                  <div className="flex gap-2">
                    <input required type="text" name="image" value={formData.image} onChange={handleChange} className="flex-1 px-4 py-2.5 bg-background border border-white/10 rounded-lg text-white" placeholder="Image URL" />
                    <label className="cursor-pointer shrink-0 flex items-center justify-center px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                      {uploadingImage ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Upload'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-lg text-white">
                    <option>Full Stack</option>
                    <option>Frontend</option>
                    <option>Backend</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tags (Comma separated)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-lg text-white" placeholder="React, Node.js, MongoDB" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Demo URL</label>
                  <input type="text" name="demoUrl" value={formData.demoUrl} onChange={handleChange} className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">GitHub URL</label>
                  <input type="text" name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-lg text-white" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
