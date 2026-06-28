import { motion } from 'framer-motion';
import { Users, FolderKanban, MessageSquare, TrendingUp, Activity } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Projects', value: '12', icon: <FolderKanban className="w-6 h-6 text-primary" />, trend: '+2 this month' },
    { label: 'Unread Messages', value: '5', icon: <MessageSquare className="w-6 h-6 text-secondary" />, trend: '3 new today' },
    { label: 'Profile Views', value: '1,240', icon: <Users className="w-6 h-6 text-green-400" />, trend: '+15% from last week' }
  ];

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
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-300">You updated the "Task Management SaaS" project details.</p>
                  <p className="text-xs text-gray-500 mt-1">{i * 2} hours ago</p>
                </div>
              </div>
            ))}
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
