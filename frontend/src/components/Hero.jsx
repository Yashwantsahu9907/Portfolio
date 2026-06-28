import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Globe, User, Mail, MessageCircle } from 'lucide-react';
const profileImg = '/profile.jpeg';
import api, { API_URL } from '../services/api';

export default function Hero() {
  const [resumeUrl, setResumeUrl] = useState('#');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get('/resume');
        if (res.data && res.data.url) {
          setResumeUrl(`${API_URL}${res.data.url}`);
        } else {
          setResumeUrl('#');
        }
      } catch (error) {
        console.error('No resume found');
      }
    };
    fetchResume();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-8">

          {/* Left Content */}
          <motion.div
            className="flex-1 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-300">Available for new opportunities</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white">
              Hi, I'm <br className="hidden md:block" />
              <span className="text-gradient-primary">
                Yashwant Sahu
              </span>
            </motion.h1>

            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
              Full-Stack Web Developer
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              Full Stack MERN Developer passionate about building scalable web applications with clean architecture and exceptional user experiences. I specialize in React, Node.js, Express, and MongoDB while continuously strengthening my problem-solving skills through Data Structures and Algorithms.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#projects"
                className="group px-8 py-4 bg-primary text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)]"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-surface hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Download className="w-5 h-5 text-gray-400" />
                Download CV
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-5">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Connect</span>
              <div className="w-12 h-[1px] bg-white/10"></div>
              <div className="flex items-center gap-3">
                {[
                  {
                    icon: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
                    href: "https://github.com/Yashwantsahu9907",
                    label: "GitHub"
                  },
                  {
                    icon: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>,
                    href: "https://www.linkedin.com/in/yashwant-sahu-0b008b345/",
                    label: "LinkedIn"
                  },
                  {
                    icon: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 2.53 5.353 5.353 0 0 0 1.573 3.23l.115.116 5.4 5.385c.616.617 1.638.617 2.254 0 .617-.617.617-1.638 0-2.254l-5.4-5.385a2.164 2.164 0 0 1-.634-1.314 2.17 2.17 0 0 1 .05-.845 2.158 2.158 0 0 1 .495-.86l3.855-4.125 5.4-5.8c.617-.617.617-1.638 0-2.254A1.374 1.374 0 0 0 13.483 0zm-2.84 5.922l-1.92 2.052c-.616.617-.616 1.638 0 2.254.617.617 1.638.617 2.254 0l1.92-2.052c.616-.617.616-1.638 0-2.254-.616-.617-1.638-.617-2.254 0zm10.749 6.226a1.374 1.374 0 0 0-.961.438l-4.7 5.04c-.616.617-.616 1.638 0 2.254.617.617 1.638.617 2.254 0l4.7-5.04c.617-.617.617-1.638 0-2.254a1.374 1.374 0 0 0-.961-.438h-.331z" /></svg>,
                    href: "https://leetcode.com/u/yashwant789/",
                    label: "LeetCode"
                  },
                  {
                    icon: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
                    href: "https://twitter.com",
                    label: "Twitter"
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    href: "sahuyashwant000@gmail.com",
                    label: "Email"
                  }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-primary hover:text-white text-gray-400 rounded-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/25 border border-white/5 hover:border-primary/50 flex items-center justify-center"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image Area */}
          <motion.div
            className="flex-1 w-full flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Decorative Frame */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 rotate-3 transition-transform duration-500 hover:rotate-6 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl border border-primary/30 -rotate-3 transition-transform duration-500 hover:-rotate-6 pointer-events-none"></div>

              {/* Image Container */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-surface border border-white/10 z-10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-10"></div>

                {/* User Profile Image */}
                <img
                  src={profileImg}
                  alt="Yashwant Sahu"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Floating Tags */}
                <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white shadow-lg">
                    MERN Stack
                  </span>
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white shadow-lg">
                    React
                  </span>
                </div>
              </div>

              {/* Floating tech icons */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 z-20 w-16 h-16 bg-surface border border-white/10 rounded-xl flex items-center justify-center shadow-2xl backdrop-blur-md"
              >
                <div className="text-2xl font-bold text-primary">JS</div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 z-20 w-20 h-20 bg-surface border border-white/10 rounded-xl flex items-center justify-center shadow-2xl backdrop-blur-md"
              >
                <div className="text-2xl font-bold text-secondary">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
