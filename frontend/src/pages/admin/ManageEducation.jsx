import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus, Edit2, Trash2, X, Save, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function ManageEducation() {
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);
  
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    period: '',
    description: ''
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await api.get('/education');
      setEducation(res.data);
    } catch (error) {
      toast.error('Failed to load education records');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (edu = null) => {
    if (edu) {
      setCurrentEdu(edu);
      setFormData({
        degree: edu.degree,
        institution: edu.institution,
        period: edu.period,
        description: edu.description
      });
    } else {
      setCurrentEdu(null);
      setFormData({
        degree: '',
        institution: '',
        period: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEdu(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (currentEdu) {
        const res = await api.put(`/education/${currentEdu._id}`, formData);
        setEducation(education.map(edu => edu._id === currentEdu._id ? res.data : edu));
        toast.success('Education updated successfully');
      } else {
        const res = await api.post('/education', formData);
        setEducation([res.data, ...education]);
        toast.success('Education added successfully');
      }
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save education');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education record?')) return;
    
    try {
      await api.delete(`/education/${id}`);
      setEducation(education.filter(edu => edu._id !== id));
      toast.success('Education deleted successfully');
    } catch (error) {
      toast.error('Failed to delete education');
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
          <h2 className="text-2xl font-bold text-white mb-2">Education Management</h2>
          <p className="text-gray-400">Add and manage your academic background.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-secondary text-white rounded-xl font-medium transition-colors hover:bg-secondary/90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>
      </div>

      <div className="grid gap-6">
        {education.map((edu) => (
          <motion.div
            key={edu._id}
            layout
            className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-secondary shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                <p className="text-secondary font-medium">{edu.institution}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    {edu.period}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenModal(edu)}
                className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(edu._id)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}

        {education.length === 0 && (
          <div className="glass-panel p-12 text-center text-gray-500">
            No education records found. Click "Add Education" to create one.
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
                  {currentEdu ? 'Edit Education' : 'Add New Education'}
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
                    <label className="block text-sm font-medium text-gray-300 mb-1">Degree / Certification</label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      required
                      placeholder="e.g. B.Tech in Computer Science"
                      className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-secondary text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Institution Name</label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      placeholder="e.g. National Institute of Technology"
                      className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-secondary text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Period</label>
                  <input
                    type="text"
                    name="period"
                    value={formData.period}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 2017 - 2021"
                    className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-secondary text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description / Details</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Graduated with honors. Specialized in..."
                    className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-secondary text-white resize-none"
                  ></textarea>
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
                    className="px-5 py-2.5 bg-secondary text-white rounded-xl font-medium transition-colors hover:bg-secondary/90 disabled:opacity-70 flex items-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Education
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
