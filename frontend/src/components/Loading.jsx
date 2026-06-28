import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-gray-400 font-medium animate-pulse">Loading experience...</p>
      </motion.div>
    </div>
  );
}

export function ComponentLoader() {
  return (
    <div className="w-full flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );
}
