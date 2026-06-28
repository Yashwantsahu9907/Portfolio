import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, GraduationCap, Briefcase, Award, ArrowRight, Loader2 } from 'lucide-react';
import api from '../services/api';

export default function About() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState('#');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resResume, resExp] = await Promise.all([
          api.get('/resume'),
          api.get('/experience')
        ]);
        
        if (resResume.data && resResume.data.url) {
          setResumeUrl(`http://localhost:5000${resResume.data.url}`);
        }
        
        setExperiences(resExp.data);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const education = [
    {
      id: 1,
      degree: "B.Tech in Computer Science",
      institution: "National Institute of Technology",
      period: "2017 - 2021",
      description: "Graduated with honors. Specialized in distributed systems and web technologies."
    }
  ];



  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-widest">Discover</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            About <span className="text-gradient-primary">Me</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-primary mx-auto rounded-full"
          ></motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Story & Goals Area (Left side) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-center space-y-8"
          >
            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold text-white mb-4">My Journey & Vision</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                My passion for software engineering started when I built my first HTML page. Since then, it has evolved into a relentless pursuit of crafting robust, scalable, and visually stunning digital solutions. 
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                I thrive in the intersection of design and engineering. My goal is to build products that not only function flawlessly under heavy loads but also provide an intuitive, engaging, and premium experience for the end-user.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-5 border-l-4 border-l-primary flex flex-col justify-center">
                <span className="text-4xl font-bold text-white mb-1">5+</span>
                <span className="text-sm text-gray-400 font-medium">Years Experience</span>
              </div>
              <div className="glass-panel p-5 border-l-4 border-l-secondary flex flex-col justify-center">
                <span className="text-4xl font-bold text-white mb-1">40+</span>
                <span className="text-sm text-gray-400 font-medium">Projects Completed</span>
              </div>
            </div>

            <a 
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/50 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 w-fit"
            >
              <Download className="w-5 h-5" />
              Download Full Resume
            </a>
          </motion.div>

          {/* Timeline Area (Right side) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-10"
          >
            {/* Experience */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-primary">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Experience</h3>
              </div>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                ) : experiences.length > 0 ? (
                  experiences.map((exp, index) => (
                    <div key={exp._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                          <h4 className="font-bold text-lg text-white">{exp.role}</h4>
                          <span className="text-xs font-medium px-3 py-1 bg-white/5 text-gray-300 rounded-full border border-white/10 shrink-0">
                            {new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? 'Present' : new Date(exp.endDate).getFullYear()}
                          </span>
                        </div>
                        <div className="text-primary font-medium text-sm mb-3">{exp.company} • {exp.location}</div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                        
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-gray-500 border border-white/5 px-2 py-0.5 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">No experiences added yet.</div>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-secondary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {education.map((edu, index) => (
                  <div key={edu.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-secondary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <h4 className="font-bold text-lg text-white">{edu.degree}</h4>
                        <span className="text-xs font-medium px-3 py-1 bg-white/5 text-gray-300 rounded-full border border-white/10 shrink-0">{edu.period}</span>
                      </div>
                      <div className="text-secondary font-medium text-sm mb-3">{edu.institution}</div>
                      <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
