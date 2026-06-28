import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-24 pb-24"
    >
      <SEO title="Home" />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </motion.div>
  );
}
