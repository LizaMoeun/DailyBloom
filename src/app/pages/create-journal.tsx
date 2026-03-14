import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AppSidebar } from '../components/app-sidebar';
import { supabase } from '../lib/supabaseClient';

type Mood = 'happy' | 'inspired' | 'calm' | 'reflective' | 'tired';

const moodOptions = [
  { value: 'happy' as Mood, emoji: '🌞', label: 'Happy', color: '#FFF9C4' },
  { value: 'inspired' as Mood, emoji: '🌸', label: 'Inspired', color: '#F8C8DC' },
  { value: 'calm' as Mood, emoji: '☁️', label: 'Calm', color: '#BBDEFB' },
  { value: 'reflective' as Mood, emoji: '🌙', label: 'Reflective', color: '#E1BEE7' },
  { value: 'tired' as Mood, emoji: '🌧', label: 'Tired', color: '#E0E0E0' },
];

export function CreateJournal() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<Mood>('happy');
  const [loading, setLoading] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSave = async () => {
    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert('You must be logged in to save a journal entry');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('journal_entries').insert([
      {
        user_id: user.id, // Add user_id for proper relation
        title,
        content,
        mood,
        created_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (error) {
      console.error('Supabase error:', error);
      alert(`Error saving entry: ${error.message}`);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl" style={{ padding: '48px' }}>
            <h1 className="text-3xl mb-8" style={{ color: '#4A3F35' }}>
              How are you feeling today?
            </h1>

            {/* Mood Selector */}
            <div className="mb-8">
              <label className="block mb-4 opacity-70" style={{ color: '#4A3F35' }}>
                Select your mood
              </label>

              <div className="flex flex-wrap gap-3">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMood(option.value)}
                    className="px-6 py-3 rounded-full transition-all hover:scale-105"
                    style={{
                      backgroundColor: option.color,
                      color: '#4A3F35',
                      border:
                        mood === option.value
                          ? '3px solid #4A3F35'
                          : '3px solid transparent',
                    }}
                  >
                    {option.emoji} {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="block mb-2 opacity-70" style={{ color: '#4A3F35' }}>
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-2 focus:outline-none text-xl"
                style={{
                  borderColor: '#F8C8DC',
                  color: '#4A3F35',
                  backgroundColor: 'white',
                }}
                placeholder="Give your entry a title..."
              />
            </div>

            {/* Content */}
            <div className="mb-8">
              <label className="block mb-2 opacity-70" style={{ color: '#4A3F35' }}>
                Your thoughts
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-2 focus:outline-none resize-none"
                style={{
                  borderColor: '#F8C8DC',
                  color: '#4A3F35',
                  backgroundColor: 'white',
                  minHeight: '300px',
                  lineHeight: '1.8',
                }}
                placeholder="Write your thoughts here..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-8 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)',
                  color: '#4A3F35',
                }}
              >
                {loading ? 'Saving...' : 'Save Entry'}
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3 rounded-xl transition-all hover:scale-105"
                style={{
                  border: '2px solid #F8C8DC',
                  color: '#4A3F35',
                  backgroundColor: 'white',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}