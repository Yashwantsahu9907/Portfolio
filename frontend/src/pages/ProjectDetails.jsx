import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react';
import api from '../services/api';
import { ProjectDetailsSkeleton } from '../components/Skeleton';
import SEO from '../components/SEO';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error('Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-white">Project not found</h2>
        <Link to="/" className="text-primary hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <>
    <SEO title={project.title} description={project.desc} />
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-6 py-24"
    >
      <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Portfolio
      </Link>
      
      <div className="glass-panel p-8 md:p-12">
        <img src={project.image} alt={project.title} className="w-full h-[400px] object-cover rounded-xl mb-8 shadow-2xl" />
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
              <Globe className="w-6 h-6" />
            </a>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-full font-medium transition-colors">
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </a>
          </div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            {project.description}
          </p>
          <h3 className="text-2xl font-semibold mb-4 mt-8">Overview</h3>
          <p className="text-gray-400 leading-relaxed">
            {project.content}
          </p>
        </div>
      </div>
    </motion.div>
    </>
  );
}
