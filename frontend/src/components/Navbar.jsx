import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Lock } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    if (location.pathname !== '/') {
      return; // Will let standard link handle it if not on home
    }
    e.preventDefault();
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setActiveSection(href);
    } else if (href === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setActiveSection('home');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-background/80 backdrop-blur-lg border-b border-white/5 shadow-lg' : 'py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Branding */}
        <Link 
          to="/" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-baseline gap-1 text-2xl font-heading tracking-tight z-50 group"
        >
          <span className="font-bold text-white group-hover:text-primary transition-colors">Yashwant</span>
          <span className="font-light text-gray-400">Sahu</span>
          <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href && location.pathname === '/';
            return (
              <a 
                key={link.name} 
                href={location.pathname === '/' ? `#${link.href}` : `/#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full group ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/admin" 
            className="px-5 py-2.5 bg-surface hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
          >
            <Lock className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-gray-300 group-hover:text-white transition-colors">Admin Login</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </div>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 md:hidden bg-surface/95 backdrop-blur-xl border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col px-6 py-6 gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href && location.pathname === '/';
                return (
                  <a 
                    key={link.name} 
                    href={location.pathname === '/' ? `#${link.href}` : `/#${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-lg font-medium px-4 py-3 rounded-xl transition-colors flex items-center justify-between ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </a>
                );
              })}
              <div className="w-full h-[1px] bg-white/10 my-2" />
              <Link 
                to="/admin" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3"
              >
                <Lock className="w-5 h-5" />
                Admin Login
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
