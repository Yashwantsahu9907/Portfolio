import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FolderKanban, MessageSquare, TrendingUp, Activity, Loader2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function Dashboard() {
  const [data, setData] = useState({
    stats: {
      totalProjects: 0,
      totalMessages: 0,
      totalSkills: 0
    },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/dashboard');
        setData(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const stats = [
    { label: 'Total Projects', value: data.stats.totalProjects, icon: <FolderKanban className="w-6 h-6 text-primary" />, trend: 'Active' },
    { label: 'Total Messages', value: data.stats.totalMessages, icon: <MessageSquare className="w-6 h-6 text-secondary" />, trend: 'Inbox' },
    { label: 'Total Skills', value: data.stats.totalSkills, icon: <Users className="w-6 h-6 text-green-400" />, trend: 'Acquired' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-xl font-bold text-white">Oops! Something went wrong</h3>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "Just now";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 border border-white/10 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                {stat.icon}
              </div>
              <Activity className="w-5 h-5 text-gray-500" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-gray-400 mb-4">{stat.label}</p>
            <div className="flex items-center gap-2 text-xs font-medium text-green-400 bg-green-400/10 w-fit px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3" />
              {stat.trend}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 border border-white/10"
        >
          <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {data.recentActivity.length === 0 ? (
              <p className="text-gray-400 text-sm">No recent activity found.</p>
            ) : (
              data.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{timeAgo(activity.date)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 border border-white/10 flex flex-col items-center justify-center text-center min-h-[300px]"
        >
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Analytics Integration</h3>
          <p className="text-sm text-gray-400 max-w-sm mb-6">
            Connect Google Analytics to see live traffic, audience demographics, and engagement metrics directly in your dashboard.
          </p>
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors border border-white/10">
            Connect Account
          </button>
        </motion.div>
      </div>
    </div>
  );
}
