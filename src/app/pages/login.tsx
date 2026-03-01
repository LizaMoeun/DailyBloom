import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store auth state
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 bg-white" 
      style={{ color: '#4A3F35' }}
    >
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
        style={{ border: '2px solid #F8C8DC', color: '#4A3F35' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
        style={{ padding: '48px' }}
      >
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌸</div>
          <h1 className="text-3xl mb-2" style={{ color: '#4A3F35' }}>Welcome Back</h1>
          <p className="opacity-70" style={{ color: '#4A3F35' }}>Login to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm opacity-70" style={{ color: '#4A3F35' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all"
              style={{ 
                borderColor: '#F8C8DC', 
                color: '#4A3F35',
                backgroundColor: 'white'
              }}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm opacity-70" style={{ color: '#4A3F35' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all"
              style={{ 
                borderColor: '#F8C8DC', 
                color: '#4A3F35',
                backgroundColor: 'white'
              }}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)', color: '#4A3F35' }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm opacity-70" style={{ color: '#4A3F35' }}>
          Don't have an account?{' '}
          <Link to="/register" className="opacity-100" style={{ color: '#E8B8CC' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}