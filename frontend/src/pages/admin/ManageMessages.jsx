import { useState, useEffect } from 'react';
import { Mail, Clock, CheckCircle2, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  const fetchMessages = async () => {
    try {
      const res = await api.get('/admin/messages');
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error('Failed to load messages');
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Inbox</h2>
        <p className="text-sm text-gray-400">Manage contact messages from your portfolio visitors.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.length === 0 ? (
            <div className="glass-panel p-12 text-center text-gray-400 border border-white/10">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your inbox is empty.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className="glass-panel p-6 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{msg.name}</h4>
                      <a href={`mailto:${msg.email}`} className="text-sm text-gray-400 hover:text-primary transition-colors">{msg.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="bg-background/50 rounded-xl p-5 border border-white/5">
                  <h5 className="font-semibold text-white mb-2">{msg.subject}</h5>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
