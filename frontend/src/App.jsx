import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { PageLoader } from './components/Loading';

// Public Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));

// Lazy Loaded Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManageProjects = lazy(() => import('./pages/admin/ManageProjects'));
const ManageMessages = lazy(() => import('./pages/admin/ManageMessages'));
const ManageResume = lazy(() => import('./pages/admin/ManageResume'));
const ManageSkills = lazy(() => import('./pages/admin/ManageSkills'));
const ManageExperience = lazy(() => import('./pages/admin/ManageExperience'));
const ManageEducation = lazy(() => import('./pages/admin/ManageEducation'));

function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
    <AuthProvider>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden text-foreground w-full max-w-[100vw]">
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#171717',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }} />
        
        <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="messages" element={<ManageMessages />} />
            <Route path="resume" element={<ManageResume />} />
            <Route path="skills" element={<ManageSkills />} />
            <Route path="experience" element={<ManageExperience />} />
            <Route path="education" element={<ManageEducation />} />
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              
              <main className="flex-grow z-10 relative">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/project/:id" element={<ProjectDetails />} />
                </Routes>
              </main>

              <Footer />
            </>
          } />
        </Routes>
        </Suspense>
        </AnimatePresence>
      </div>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
