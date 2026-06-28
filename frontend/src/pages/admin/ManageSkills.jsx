import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend Development',
    level: 50,
    icon: 'Code',
    order: 0
  });

  const categories = [
    'Frontend Development',
    'Backend Development',
    'Database & Storage',
    'Tools & DevOps',
    'Other'
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (error) {
      toast.error('Failed to load skills');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setCurrentSkill(skill);
      setFormData({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        icon: skill.icon,
        order: skill.order
      });
    } else {
      setCurrentSkill(null);
      setFormData({
        name: '',
        category: 'Frontend Development',
        level: 50,
        icon: 'Code',
        order: skills.length
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSkill(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' || name === 'order' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (currentSkill) {
        const res = await api.put(`/skills/${currentSkill._id}`, formData);
        setSkills(skills.map(s => s._id === currentSkill._id ? res.data : s));
        toast.success('Skill updated successfully');
      } else {
        const res = await api.post('/skills', formData);
        setSkills([...skills, res.data]);
        toast.success('Skill added successfully');
      }
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save skill');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      await api.delete(`/skills/${id}`);
      setSkills(skills.filter(s => s._id !== id));
      toast.success('Skill deleted successfully');
    } catch (error) {
      toast.error('Failed to delete skill');
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
          <h2 className="text-2xl font-bold text-white mb-2">Skills Management</h2>
          <p className="text-gray-400">Add, edit, and organize your technical skills.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-primary text-white rounded-xl font-medium transition-colors hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 font-medium text-gray-300">Name</th>
                <th className="p-4 font-medium text-gray-300">Category</th>
                <th className="p-4 font-medium text-gray-300">Proficiency</th>
                <th className="p-4 font-medium text-gray-300">Order</th>
                <th className="p-4 font-medium text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {skills.map((skill) => (
                <tr key={skill._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-white flex items-center gap-2">
                      {skill.name}
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{skill.category}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-white/10 rounded-full h-1.5 max-w-[100px]">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 w-8">{skill.level}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{skill.order}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(skill)}
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No skills found. Click "Add Skill" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
              className="relative w-full max-w-lg bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  {currentSkill ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Skill Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., React.js"
                    className="w-full px-4 py-2.5 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white appearance-none"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Proficiency ({formData.level}%)</label>
                    <input
                      type="range"
                      name="level"
                      min="0"
                      max="100"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary mt-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Display Order</label>
                    <input
                      type="number"
                      name="order"
                      min="0"
                      value={formData.order}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Icon Name (Lucide)</label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="e.g., Code, Database, Server"
                    className="w-full px-4 py-2.5 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">Use a Lucide icon name (e.g., Code, Layout, Server, Database, Wrench).</p>
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
                    Save Skill
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
