import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Loader2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '', desc: '', image: '', category: 'Full Stack', tags: '', demoUrl: '', githubUrl: ''
  });

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
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      await api.post('/admin/projects', payload);
      
      toast.success('Project added successfully');
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
          onClick={() => setIsModalOpen(true)}
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
                        <img src={project.image} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
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
                      <button 
                        onClick={() => handleDelete(project._id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
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
              <h3 className="text-lg font-bold text-white">Create New Project</h3>
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                  <input required type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-lg text-white" />
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
