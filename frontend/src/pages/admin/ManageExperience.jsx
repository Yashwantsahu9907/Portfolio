import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus, Edit2, Trash2, X, Save, Calendar, Briefcase, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function ManageExperience() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    type: 'Full-time',
    startDate: '',
    endDate: '',
    isCurrent: false,
    location: '',
    description: '',
    technologies: '',
    logo: 'Briefcase',
    order: 0
  });

  const types = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'];

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/experience');
      setExperiences(res.data);
    } catch (error) {
      toast.error('Failed to load experiences');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setCurrentExp(exp);
      setFormData({
        company: exp.company,
        role: exp.role,
        type: exp.type,
        startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
        endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
        isCurrent: exp.isCurrent,
        location: exp.location || '',
        description: exp.description,
        technologies: exp.technologies.join(', '),
        logo: exp.logo || 'Briefcase',
        order: exp.order || 0
      });
    } else {
      setCurrentExp(null);
      setFormData({
        company: '',
        role: '',
        type: 'Full-time',
        startDate: '',
        endDate: '',
        isCurrent: false,
        location: '',
        description: '',
        technologies: '',
        logo: 'Briefcase',
        order: experiences.length
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentExp(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== '')
    };

    try {
      if (currentExp) {
        const res = await api.put(`/experience/${currentExp._id}`, dataToSend);
        setExperiences(experiences.map(exp => exp._id === currentExp._id ? res.data : exp));
        toast.success('Experience updated successfully');
      } else {
        const res = await api.post('/experience', dataToSend);
        setExperiences([...experiences, res.data]);
        toast.success('Experience added successfully');
      }
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save experience');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      await api.delete(`/experience/${id}`);
      setExperiences(experiences.filter(exp => exp._id !== id));
      toast.success('Experience deleted successfully');
    } catch (error) {
      toast.error('Failed to delete experience');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Experience Management</h2>
          <p className="text-gray-400">Add and manage your professional work history.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-primary text-white rounded-xl font-medium transition-colors hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      <div className="grid gap-6">
        {experiences.map((exp) => (
          <motion.div
            key={exp._id}
            layout
            className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-primary shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} - {exp.isCurrent ? 'Present' : new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenModal(exp)}
                className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp._id)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}

        {experiences.length === 0 && (
          <div className="glass-panel p-12 text-center text-gray-500">
            No experiences found. Click "Add Experience" to create one.
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={handleCloseModal}
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  {currentExp ? 'Edit Experience' : 'Add New Experience'}
                </h3>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh] space-y-4 custom-scrollbar">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Role / Title</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Employment Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white appearance-none"
                    >
                      {types.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      disabled={formData.isCurrent}
                      className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white disabled:opacity-50"
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isCurrent"
                        id="isCurrent"
                        checked={formData.isCurrent}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-white/10 bg-background/50 text-primary focus:ring-primary"
                      />
                      <label htmlFor="isCurrent" className="text-sm text-gray-400 cursor-pointer">I am currently working in this role</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Technologies Used (comma separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    placeholder="e.g. React, Node.js, MongoDB"
                    className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description / Responsibilities</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white resize-none"
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Logo / Icon</label>
                    <input
                      type="text"
                      name="logo"
                      value={formData.logo}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Display Order</label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5 py-2.5 text-gray-300 hover:bg-white/5 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium transition-colors hover:bg-primary/90 disabled:opacity-70 flex items-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Experience
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
