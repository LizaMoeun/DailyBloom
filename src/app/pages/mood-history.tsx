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

const moodConfig = {
  happy: { emoji: '🌞', label: 'Happy', color: '#FFF9C4' },
  inspired: { emoji: '🌸', label: 'Inspired', color: '#F8C8DC' },
  calm: { emoji: '☁️', label: 'Calm', color: '#BBDEFB' },
  reflective: { emoji: '🌙', label: 'Reflective', color: '#E1BEE7' },
  tired: { emoji: '🌧', label: 'Tired', color: '#E0E0E0' },
};

export function MoodHistory() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [moodStats, setMoodStats] = useState<Record<Mood, number>>({
    happy: 0,
    inspired: 0,
    calm: 0,
    reflective: 0,
    tired: 0,
  });
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
      .order('created_at', { ascending: true });

    setLoading(false);

    if (error) {
      console.error('Error fetching journal entries:', error);
      alert(`Failed to load mood history: ${error.message}`);
      return;
    }

    if (data) {
      setEntries(data);

      const stats = data.reduce((acc: Record<Mood, number>, entry) => {
        const mood = entry.mood as Mood;
        acc[mood] = (acc[mood] || 0) + 1;
        return acc;
      }, { happy: 0, inspired: 0, calm: 0, reflective: 0, tired: 0 });

      setMoodStats(stats);
    }
  };

  const total = Object.values(moodStats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl" style={{ padding: '48px' }}>
            <h1 className="text-3xl mb-8" style={{ color: '#4A3F35' }}>
              Mood History
            </h1>

            {loading ? (
              <div className="text-center py-12" style={{ color: '#4A3F35' }}>
                Loading mood data...
              </div>
            ) : total === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <p className="opacity-70" style={{ color: '#4A3F35' }}>
                  No mood data yet. Start journaling to see your mood patterns!
                </p>
              </div>
            ) : (
              <>
                {/* Calendar placeholder */}
                <div
                  className="mb-12 rounded-2xl p-12 text-center"
                  style={{ backgroundColor: '#FFF8F5', border: '2px dashed #F8C8DC' }}
                >
                  <p className="opacity-60" style={{ color: '#4A3F35' }}>
                    📅 Calendar view with mood markers
                  </p>
                  <p className="text-sm mt-2 opacity-40" style={{ color: '#4A3F35' }}>
                    {total} total entries
                  </p>
                </div>

                {/* Mood Distribution */}
                <div>
                  <h2 className="text-xl mb-6" style={{ color: '#4A3F35' }}>
                    Mood Distribution
                  </h2>

                  <div className="space-y-4">
                    {(Object.keys(moodConfig) as Mood[]).map((mood) => {
                      const count = moodStats[mood];
                      const percentage = total > 0 ? (count / total) * 100 : 0;

                      return (
                        <div key={mood} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div
                              className="flex items-center gap-3 px-4 py-2 rounded-full"
                              style={{
                                backgroundColor: moodConfig[mood].color,
                                color: '#4A3F35',
                              }}
                            >
                              <span>{moodConfig[mood].emoji}</span>
                              <span>{moodConfig[mood].label}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span style={{ color: '#4A3F35', opacity: 0.6 }}>
                                {count} {count === 1 ? 'entry' : 'entries'}
                              </span>
                              <span style={{ color: '#4A3F35' }}>{percentage.toFixed(0)}%</span>
                            </div>
                          </div>
                          <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: moodConfig[mood].color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-12 grid grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#FFF8F5' }}>
                    <div className="text-3xl mb-2" style={{ color: '#4A3F35' }}>
                      {total}
                    </div>
                    <div className="text-sm opacity-60" style={{ color: '#4A3F35' }}>
                      Total Entries
                    </div>
                  </div>

                  <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#FFF8F5' }}>
                    <div className="text-3xl mb-2">
                      {Object.entries(moodStats).reduce(
                        (max, [mood, count]) => (count > max.count ? { mood: mood as Mood, count } : max),
                        { mood: 'happy' as Mood, count: 0 }
                      ).count > 0
                        ? moodConfig[
                            Object.entries(moodStats).reduce(
                              (max, [mood, count]) => (count > max.count ? { mood: mood as Mood, count } : max),
                              { mood: 'happy' as Mood, count: 0 }
                            ).mood
                          ].emoji
                        : '—'}
                    </div>
                    <div className="text-sm opacity-60" style={{ color: '#4A3F35' }}>
                      Most Common Mood
                    </div>
                  </div>

                  <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#FFF8F5' }}>
                    <div className="text-3xl mb-2" style={{ color: '#4A3F35' }}>
                      {entries.length > 0
                        ? Math.ceil((Date.now() - new Date(entries[0].created_at).getTime()) / (1000 * 60 * 60 * 24))
                        : 0}
                    </div>
                    <div className="text-sm opacity-60" style={{ color: '#4A3F35' }}>
                      Days Journaling
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}