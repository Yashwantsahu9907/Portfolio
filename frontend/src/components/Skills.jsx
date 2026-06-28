import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench, Code, Loader2 } from 'lucide-react';
import api from '../services/api';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        setSkills(res.data);
      } catch (error) {
        console.error('Failed to load skills', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Layout className="w-6 h-6 text-primary" />,
      skills: skills.filter(s => s.category === 'Frontend Development')
    },
    {
      title: "Backend Development",
      icon: <Server className="w-6 h-6 text-secondary" />,
      skills: skills.filter(s => s.category === 'Backend Development')
    },
    {
      title: "Database & Storage",
      icon: <Database className="w-6 h-6 text-green-400" />,
      skills: skills.filter(s => s.category === 'Database & Storage')
    },
    {
      title: "Tools & DevOps",
      icon: <Wrench className="w-6 h-6 text-orange-400" />,
      skills: skills.filter(s => s.category === 'Tools & DevOps')
    },
    {
      title: "Other",
      icon: <Code className="w-6 h-6 text-gray-400" />,
      skills: skills.filter(s => s.category === 'Other')
    }
  ].filter(category => category.skills.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Code className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary uppercase tracking-widest">Expertise</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Technical <span className="text-gradient-primary">Skills</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            A comprehensive overview of my technical toolkit. I constantly learn and adapt to new technologies to build modern, efficient, and scalable applications.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : skillCategories.length > 0 ? (
            skillCategories.map((category, catIdx) => (
            <motion.div 
              key={catIdx}
              variants={itemVariants}
              className="glass-panel p-6 group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      <span className="text-xs font-mono text-gray-500">{skill.level}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (skillIdx * 0.1), ease: "easeOut" }}
                        className="h-full bg-primary rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No technical skills have been added yet.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
