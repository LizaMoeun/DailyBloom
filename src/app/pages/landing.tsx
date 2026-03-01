import { Link } from 'react-router';
import { BookHeart, Sparkles, TrendingUp } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-white" style={{ color: '#4A3F35' }}>
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between">
        <div className="text-2xl">🌸 DailyBloom</div>
        <div className="flex gap-4">
          <Link 
            to="/login" 
            className="px-6 py-2 rounded-full transition-all hover:opacity-80"
            style={{ border: '2px solid #F8C8DC', color: '#4A3F35' }}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-6 py-2 rounded-full transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)', color: '#4A3F35' }}
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <h1 className="text-6xl mb-6" style={{ color: '#4A3F35' }}>
          Welcome to DailyBloom
        </h1>
        <p className="text-xl mb-12 opacity-80" style={{ color: '#4A3F35' }}>
          Your personal journaling companion for mindful reflection and growth
        </p>
        <Link 
          to="/register" 
          className="inline-block px-12 py-4 text-lg rounded-full transition-all hover:scale-105 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)', color: '#4A3F35' }}
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center transition-all hover:scale-105"
            style={{ border: '1px solid #F8C8DC' }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF9C4' }}>
              <Sparkles className="w-8 h-8" style={{ color: '#4A3F35' }} />
            </div>
            <h3 className="text-xl mb-4" style={{ color: '#4A3F35' }}>Mood Tracking</h3>
            <p className="opacity-70" style={{ color: '#4A3F35' }}>
              Track your emotions with beautiful pastel mood badges
            </p>
          </div>

          <div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center transition-all hover:scale-105"
            style={{ border: '1px solid #F8C8DC' }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BBDEFB' }}>
              <BookHeart className="w-8 h-8" style={{ color: '#4A3F35' }} />
            </div>
            <h3 className="text-xl mb-4" style={{ color: '#4A3F35' }}>Journal Entries</h3>
            <p className="opacity-70" style={{ color: '#4A3F35' }}>
              Write and organize your thoughts in a beautiful space
            </p>
          </div>

          <div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center transition-all hover:scale-105"
            style={{ border: '1px solid #F8C8DC' }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E1BEE7' }}>
              <TrendingUp className="w-8 h-8" style={{ color: '#4A3F35' }} />
            </div>
            <h3 className="text-xl mb-4" style={{ color: '#4A3F35' }}>Insights</h3>
            <p className="opacity-70" style={{ color: '#4A3F35' }}>
              Discover patterns in your mood and journaling habits
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 text-center mt-24 border-t" style={{ borderColor: '#F8C8DC', color: '#4A3F35', opacity: 0.7 }}>
        <p>© 2026 DailyBloom. Made with love for mindful journaling.</p>
      </footer>
    </div>
  );
}