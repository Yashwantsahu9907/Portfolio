import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, FolderKanban, MessageSquare, LogOut, Loader2, Code2, Menu, X, FileText, Wrench, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminLayout() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Projects', path: '/admin/projects', icon: <FolderKanban className="w-5 h-5" /> },
    { name: 'Skills', path: '/admin/skills', icon: <Wrench className="w-5 h-5" /> },
    { name: 'Experience', path: '/admin/experience', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Resume', path: '/admin/resume', icon: <FileText className="w-5 h-5" /> },
  ];

  const SidebarContent = () => (
    <>
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
          <Code2 className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
          <span className="text-white">AdminPanel</span>
        </Link>
        <button className="md:hidden text-gray-400" onClick={() => setIsSidebarOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Menu</div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-surface/50 hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-surface border-r border-white/10 z-50 flex flex-col md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 border-b border-white/10 bg-surface/30 backdrop-blur-md flex items-center justify-between px-6 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-white capitalize">
              {location.pathname.split('/').pop() || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              Admin Mode Active
            </span>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
