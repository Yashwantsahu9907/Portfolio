import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Globe, FolderGit2, ArrowRight } from 'lucide-react';
import api, { API_URL } from '../services/api';
import { ProjectSkeleton } from './Skeleton';
import SEO from './SEO';

export default function Projects() {
  const [filter, setFilter] = useState('All');

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

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (error) {
        console.error('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

  const filteredProjects = projects.filter(project => 
    filter === 'All' ? true : project.category === filter
  );

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <SEO title="Projects" description="Explore my latest Full-Stack projects, including e-commerce platforms, SaaS dashboards, and AI applications." />
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <FolderGit2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-widest">Portfolio</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Featured <span className="text-gradient-primary">Projects</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"
          ></motion.div>
          
          {/* Filter Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <motion.div key={`skeleton-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ProjectSkeleton />
                </motion.div>
              ))
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div 
                  key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="glass-panel group flex flex-col h-full overflow-hidden border border-white/10 hover:border-primary/50 transition-colors"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <img 
                    src={getImageUrl(project.image)} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white shadow-lg">
                      {project.category}
                    </span>
                  </div>
                  {/* Hover Actions */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40 backdrop-blur-sm">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface border border-white/20 text-white rounded-full hover:scale-110 transition-transform hover:bg-white/10">
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow bg-surface/50 backdrop-blur-md">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                    {project.desc}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-md text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Footer Action */}
                  <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                    <Link to={`/project/${project._id}`} className="text-sm font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-2 group/link">
                      View Case Study 
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform text-primary" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// Need to import ArrowRight at the top, let me fix it via replace_file_content if needed.
