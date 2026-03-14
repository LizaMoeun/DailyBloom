import { Link, useNavigate, useLocation } from 'react-router';
import { Home, PlusCircle, TrendingUp, User, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/journal/new', icon: PlusCircle, label: 'New Entry' },
    { to: '/mood-history', icon: TrendingUp, label: 'Mood History' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div 
      className="w-64 min-h-screen flex flex-col bg-gray-50"
      style={{ padding: '32px 24px', borderRight: '1px solid #F8C8DC' }}
    >
      <div className="mb-12">
        <div className="text-2xl mb-1" style={{ color: '#4A3F35' }}>🌸 DailyBloom</div>
        <div className="text-sm opacity-60" style={{ color: '#4A3F35' }}>Your Journal</div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:scale-105"
              style={{
                backgroundColor: isActive ? 'rgba(248, 200, 220, 0.5)' : 'transparent',
                color: '#4A3F35',
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:scale-105 mt-auto"
        style={{ color: '#4A3F35', border: '1px solid #F8C8DC' }}
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}