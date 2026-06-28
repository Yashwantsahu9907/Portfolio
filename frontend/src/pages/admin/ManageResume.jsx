import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Loader2, Trash2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function ManageResume() {
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await api.get('/resume');
      if (res.data && res.data.url) {
        setResume(res.data);
      } else {
        setResume(null);
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error('Failed to load resume');
      }
      setResume(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a valid PDF file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setIsUploading(true);
    try {
      const res = await api.post('/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResume(res.data);
      toast.success('Resume uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload resume');
      console.error(error);
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    
    setIsDeleting(true);
    try {
      await api.delete(`/resume/${resume._id}`);
      setResume(null);
      toast.success('Resume deleted successfully');
    } catch (error) {
      toast.error('Failed to delete resume');
    } finally {
      setIsDeleting(false);
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
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Resume Management</h2>
        <p className="text-gray-400">Upload, update, and manage the resume displayed on your portfolio.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="glass-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group border-dashed">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          />
          <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary group-hover:scale-110 transition-transform">
            {isUploading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            {resume ? 'Replace Current Resume' : 'Upload New Resume'}
          </h3>
          <p className="text-gray-400 text-sm mb-4">Drag and drop your PDF here, or click to browse</p>
          <span className="text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full">PDF only, max 5MB</span>
        </div>

        {/* Current Resume Section */}
        <div className="glass-panel p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Current Resume
          </h3>

          {resume ? (
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-white mb-1 truncate max-w-[200px]">{resume.originalName}</h4>
                  <p className="text-xs text-gray-400">
                    Last updated: {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                  Active
                </span>
              </div>

              <div className="flex gap-3">
                <a
                  href={`http://localhost:5000${resume.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-white/10"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview
                </a>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg font-medium transition-colors flex items-center justify-center border border-red-500/20 disabled:opacity-50"
                  title="Delete Resume"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[150px] flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-xl bg-white/5">
              <FileText className="w-8 h-8 text-gray-500 mb-2 opacity-50" />
              <p className="text-gray-400 text-sm">No resume is currently active on your portfolio.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
