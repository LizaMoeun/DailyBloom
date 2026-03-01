import { Link, useLocation, useNavigate } from "react-router";
import { Home, BookOpen, Heart, User, LogOut, Flower2 } from "lucide-react";
import { Button } from "./ui/button";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };
  
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/journal/new", label: "New Entry", icon: BookOpen },
    { path: "/mood-history", label: "Mood History", icon: Heart },
    { path: "/profile", label: "Profile", icon: User },
  ];
  
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen p-6 flex flex-col">
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-2 mb-12">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Flower2 className="w-5 h-5 text-primary" />
        </div>
        <span className="font-medium text-lg">DailyBloom</span>
      </Link>
      
      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-2xl transition-all
                ${isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="w-full justify-start gap-3 px-4 py-3 rounded-2xl hover:bg-sidebar-accent text-sidebar-foreground"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </Button>
    </aside>
  );
}
