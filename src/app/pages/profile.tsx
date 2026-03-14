import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AppSidebar } from '../components/app-sidebar';
import { supabase } from '../lib/supabaseClient';

type Mood = 'happy' | 'inspired' | 'calm' | 'reflective' | 'tired';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: Mood;
  created_at: string;
}

export function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stats, setStats] = useState({
    totalEntries: 0,
    currentStreak: 0,
    mostCommonMood: 'happy' as Mood,
  });
  const [loading, setLoading] = useState(false);

  const moodConfig = {
    happy: { emoji: '🌞', label: 'Happy', color: '#FFF9C4' },
    inspired: { emoji: '🌸', label: 'Inspired', color: '#F8C8DC' },
    calm: { emoji: '☁️', label: 'Calm', color: '#BBDEFB' },
    reflective: { emoji: '🌙', label: 'Reflective', color: '#E1BEE7' },
    tired: { emoji: '🌧', label: 'Tired', color: '#E0E0E0' },
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
      return;
    }

    fetchProfile();
    fetchStats();
  }, [navigate]);

  const fetchProfile = async () => {
    const user = supabase.auth.user();
    if (user) {
      setName(user.user_metadata.full_name || 'User');
      setEmail(user.email || 'user@example.com');
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: true });

    setLoading(false);

    if (error) {
      console.error('Error fetching journal entries:', error);
      return;
    }

    if (!data || data.length === 0) {
      return;
    }

    const moodCounts = data.reduce((acc: Record<Mood, number>, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, { happy: 0, inspired: 0, calm: 0, reflective: 0, tired: 0 });

    const mostCommon = Object.entries(moodCounts).reduce(
      (max, [mood, count]) => (count > max.count ? { mood: mood as Mood, count } : max),
      { mood: 'happy' as Mood, count: 0 }
    );

    // Calculate streak
    const sortedEntries = [...data].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].created_at);
      entryDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }

    setStats({
      totalEntries: data.length,
      currentStreak: streak,
      mostCommonMood: mostCommon.mood,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = supabase.auth.user();
    if (!user) return;

    const { error } = await supabase.auth.update({
      data: { full_name: name },
    });

    if (error) {
      alert('Failed to update profile: ' + error.message);
    } else {
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar />

      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg" style={{ padding: '48px' }}>
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl mb-4"
              style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)' }}
            >
              <span style={{ color: '#4A3F35' }}>{name.charAt(0).toUpperCase()}</span>
            </div>
            <h1 className="text-2xl" style={{ color: '#4A3F35' }}>{name}</h1>
            <p className="opacity-60" style={{ color: '#4A3F35' }}>{email}</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6 mb-8">
            <div>
              <label className="block mb-2 text-sm opacity-70" style={{ color: '#4A3F35' }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                style={{ borderColor: '#F8C8DC', color: '#4A3F35', backgroundColor: 'white' }}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm opacity-70" style={{ color: '#4A3F35' }}>Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-4 py-3 rounded-xl border-2 bg-gray-100 opacity-70 cursor-not-allowed"
                style={{ borderColor: '#F8C8DC', color: '#4A3F35' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)', color: '#4A3F35' }}
            >
              Update Profile
            </button>
          </form>

          {loading ? (
            <p style={{ color: '#4A3F35' }}>Loading stats...</p>
          ) : (
            <div className="border-t pt-8" style={{ borderColor: '#F8C8DC' }}>
              <h2 className="text-lg mb-4" style={{ color: '#4A3F35' }}>Journal Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="opacity-70" style={{ color: '#4A3F35' }}>Total Entries</span>
                  <span style={{ color: '#4A3F35' }}>{stats.totalEntries}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="opacity-70" style={{ color: '#4A3F35' }}>Current Streak</span>
                  <span style={{ color: '#4A3F35' }}>
                    {stats.currentStreak} {stats.currentStreak === 1 ? 'day' : 'days'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="opacity-70" style={{ color: '#4A3F35' }}>Most Common Mood</span>
                  <div className="px-3 py-1 rounded-full" style={{ backgroundColor: moodConfig[stats.mostCommonMood].color, color: '#4A3F35' }}>
                    {moodConfig[stats.mostCommonMood].emoji} {moodConfig[stats.mostCommonMood].label}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}