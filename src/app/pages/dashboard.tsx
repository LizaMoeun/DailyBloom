import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AppSidebar } from '../components/app-sidebar';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabaseClient'; // backend Supabase client

type Mood = 'happy' | 'inspired' | 'calm' | 'reflective' | 'tired';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: Mood;
  created_at: string;
}

const moodConfig = {
  happy: { emoji: '🌞', label: 'Happy', color: '#FFF9C4' },
  inspired: { emoji: '🌸', label: 'Inspired', color: '#F8C8DC' },
  calm: { emoji: '☁️', label: 'Calm', color: '#BBDEFB' },
  reflective: { emoji: '🌙', label: 'Reflective', color: '#E1BEE7' },
  tired: { emoji: '🌧', label: 'Tired', color: '#E0E0E0' },
};

export function Dashboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
      return;
    }

    fetchEntries();
  }, [navigate]);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });

    setLoading(false);

    if (error) {
      console.error('Error fetching entries:', error);
      alert(`Failed to load entries: ${error.message}`);
      return;
    }

    setEntries(data || []);
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar />

      <div className="flex-1">
        {/* Header */}
        <header 
          className="flex items-center justify-between px-8 py-6 bg-white/50 backdrop-blur-sm"
          style={{ borderBottom: '1px solid #F8C8DC' }}
        >
          <h1 className="text-2xl" style={{ color: '#4A3F35' }}>Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#4A3F35', opacity: 0.5 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entries..."
                className="pl-10 pr-4 py-2 rounded-full border-2 focus:outline-none"
                style={{ borderColor: '#F8C8DC', color: '#4A3F35', backgroundColor: 'white' }}
              />
            </div>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)' }}
            >
              <span style={{ color: '#4A3F35' }}>
                {localStorage.getItem('userName')?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>
        </header>

        {/* Entries Grid */}
        <div className="p-8">
          {loading ? (
            <div className="text-center py-24 text-xl opacity-70" style={{ color: '#4A3F35' }}>Loading entries...</div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📔</div>
              <h2 className="text-2xl mb-2" style={{ color: '#4A3F35' }}>No entries yet</h2>
              <p className="mb-6 opacity-70" style={{ color: '#4A3F35' }}>Start your journaling journey today!</p>
              <Link
                to="/journal/new"
                className="inline-block px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)', color: '#4A3F35' }}
              >
                Create First Entry
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntries.map((entry) => (
                <Link
                  key={entry.id}
                  to={`/journal/${entry.id}`}
                  className="bg-white rounded-2xl p-6 transition-all hover:scale-105 hover:shadow-xl"
                  style={{ border: '1px solid #F8C8DC' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm opacity-60" style={{ color: '#4A3F35' }}>
                      {new Date(entry.created_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <div 
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: moodConfig[entry.mood].color,
                        color: '#4A3F35'
                      }}
                    >
                      {moodConfig[entry.mood].emoji} {moodConfig[entry.mood].label}
                    </div>
                  </div>
                  <h3 className="text-xl mb-2" style={{ color: '#4A3F35' }}>
                    {entry.title}
                  </h3>
                  <p className="opacity-70 line-clamp-3" style={{ color: '#4A3F35' }}>
                    {entry.content}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}