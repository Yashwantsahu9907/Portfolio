export function ProjectSkeleton() {
  return (
    <div className="glass-panel group flex flex-col h-full overflow-hidden border border-white/10 animate-pulse">
      <div className="relative h-56 bg-white/5"></div>
      <div className="p-6 flex flex-col flex-grow bg-surface/50">
        <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
        <div className="space-y-2 mb-6 flex-grow">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-2/3"></div>
        </div>
        <div className="flex gap-2 mb-6">
          <div className="h-6 bg-white/10 rounded w-16"></div>
          <div className="h-6 bg-white/10 rounded w-16"></div>
        </div>
        <div className="pt-4 border-t border-white/10">
          <div className="h-4 bg-white/10 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailsSkeleton() {
  return (
    <div className="container mx-auto px-6 py-24 animate-pulse">
      <div className="w-32 h-6 bg-white/5 rounded mb-8"></div>
      <div className="glass-panel p-8 md:p-12">
        <div className="w-full h-[400px] bg-white/5 rounded-xl mb-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="w-full md:w-2/3">
            <div className="h-10 bg-white/10 rounded w-3/4 mb-4"></div>
            <div className="flex gap-2 mb-6">
              <div className="h-8 bg-white/10 rounded w-20"></div>
              <div className="h-8 bg-white/10 rounded w-20"></div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-full"></div>
            <div className="w-32 h-12 bg-white/10 rounded-full"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-white/5 rounded w-full"></div>
          <div className="h-6 bg-white/5 rounded w-full"></div>
          <div className="h-6 bg-white/5 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}
