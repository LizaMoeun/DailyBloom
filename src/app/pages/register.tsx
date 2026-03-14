import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    setLoading(false);

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert('Registration successful! Check your email for verification.');
      navigate('/verify');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white" style={{ color: '#4A3F35' }}>
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
        style={{ border: '2px solid #F8C8DC', color: '#4A3F35' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md" style={{ padding: '48px' }}>
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌸</div>
          <h1 className="text-3xl mb-2">Join DailyBloom</h1>
          <p className="opacity-70">Start your journaling journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm opacity-70">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: '#F8C8DC', color: '#4A3F35', backgroundColor: 'white' }}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm opacity-70">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: '#F8C8DC', color: '#4A3F35', backgroundColor: 'white' }}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm opacity-70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: '#F8C8DC', color: '#4A3F35', backgroundColor: 'white' }}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm opacity-70">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: '#F8C8DC', color: '#4A3F35', backgroundColor: 'white' }}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #F8C8DC 0%, #E8B8CC 100%)', color: '#4A3F35' }}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm opacity-70">
          Already have an account?{' '}
          <Link to="/login" className="opacity-100" style={{ color: '#E8B8CC' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}