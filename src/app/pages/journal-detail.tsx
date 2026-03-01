import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { AppSidebar } from '../components/app-sidebar';
import { Edit2, Trash2, ArrowLeft } from 'lucide-react';

type Mood = 'happy' | 'inspired' | 'calm' | 'reflective' | 'tired';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: Mood;
  date: string;
}

const moodConfig = {
  happy: { emoji: '🌞', label: 'Happy', color: '#FFF9C4' },
  inspired: { emoji: '🌸', label: 'Inspired', color: '#F8C8DC' },
  calm: { emoji: '☁️', label: 'Calm', color: '#BBDEFB' },
  reflective: { emoji: '🌙', label: 'Reflective', color: '#E1BEE7' },
  tired: { emoji: '🌧', label: 'Tired', color: '#E0E0E0' },
};

const moodOptions = [
  { value: 'happy' as Mood, emoji: '🌞', label: 'Happy', color: '#FFF9C4' },
  { value: 'inspired' as Mood, emoji: '🌸', label: 'Inspired', color: '#F8C8DC' },
  { value: 'calm' as Mood, emoji: '☁️', label: 'Calm', color: '#BBDEFB' },
  { value: 'reflective' as Mood, emoji: '🌙', label: 'Reflective', color: '#E1BEE7' },
  { value: 'tired' as Mood, emoji: '🌧', label: 'Tired', color: '#E0E0E0' },
];

export function JournalDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editMood, setEditMood] = useState<Mood>('happy');

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
      return;
    }

    const stored = localStorage.getItem('journalEntries');
    if (stored) {
      const entries = JSON.parse(stored);
      const found = entries.find((e: JournalEntry) => e.id === id);
      if (found) {
        setEntry(found);
        setEditTitle(found.title);
        setEditContent(found.content);
        setEditMood(found.mood);
      }
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this entry?')) {
      const stored = localStorage.getItem('journalEntries');
      if (stored) {
        const entries = JSON.parse(stored);
        const filtered = entries.filter((e: JournalEntry) => e.id !== id);
        localStorage.setItem('journalEntries', JSON.stringify(filtered));
        navigate('/dashboard');
      }
    }
  };

  const handleSave = () => {
    const stored = localStorage.getItem('journalEntries');
    if (stored) {
      const entries = JSON.parse(stored);
      const index = entries.findIndex((e: JournalEntry) => e.id === id);
      if (index !== -1) {
        entries[index] = {
          ...entries[index],
          title: editTitle,
          content: editContent,
          mood: editMood,
        };
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        setEntry(entries[index]);
        setIsEditing(false);
      }
    }
  };

  if (!entry) {
    return (
      <div className="flex min-h-screen bg-white">
        <AppSidebar />
        <div className="flex-1 flex items-center justify-center">
          <p style={{ color: '#4A3F35' }}>Entry not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full transition-all hover:scale-105"
            style={{ border: '2px solid #F8C8DC', color: '#4A3F35' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div 
            className="bg-white rounded-3xl shadow-xl"
            style={{ padding: '48px' }}
          >
            {isEditing ? (
              <>
                <h1 className="text-2xl mb-8" style={{ color: '#4A3F35' }}>
                  Edit Entry
                </h1>

                {/* Mood Selector */}
                <div className="mb-6">
                  <label className="block mb-4 opacity-70" style={{ color: '#4A3F35' }}>
                    Select your mood
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {moodOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setEditMood(option.value)}
                        className="px-6 py-3 rounded-full transition-all hover:scale-105"
                        style={{
                          backgroundColor: option.color,
                          color: '#4A3F35',
                          border: editMood === option.value ? '3px solid #4A3F35' : '3px solid transparent',
                        }}
                      >
                        {option.emoji} {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-2 focus:outline-none text-xl"
                    style={{ 
                      borderColor: '#F8C8DC', 
                      color: '#4A3F35',
                      backgroundColor: 'white'
                    }}
                  />
                </div>

                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border-2 focus:outline-none resize-none mb-8"
                  style={{ 
                    borderColor: '#F8C8DC', 
                    color: '#4A3F35',
                    backgroundColor: 'white',
                    minHeight: '300px',
                    lineHeight: '1.8'
                  }}
                />

                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)', color: '#4A3F35' }}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-3 rounded-xl transition-all hover:scale-105"
                    style={{ border: '2px solid #F8C8DC', color: '#4A3F35', backgroundColor: 'white' }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <span className="opacity-60" style={{ color: '#4A3F35' }}>
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </span>
                    <div 
                      className="px-4 py-2 rounded-full"
                      style={{ 
                        backgroundColor: moodConfig[entry.mood].color,
                        color: '#4A3F35'
                      }}
                    >
                      {moodConfig[entry.mood].emoji} {moodConfig[entry.mood].label}
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl mb-8" style={{ color: '#4A3F35' }}>
                  {entry.title}
                </h1>

                <div 
                  className="mb-12 whitespace-pre-wrap"
                  style={{ color: '#4A3F35', lineHeight: '1.8', fontSize: '1.125rem' }}
                >
                  {entry.content}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)', color: '#4A3F35' }}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl transition-all hover:scale-105"
                    style={{ border: '2px solid #FF6B6B', color: '#FF6B6B', backgroundColor: 'white' }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}