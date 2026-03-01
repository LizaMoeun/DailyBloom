import { Link } from "react-router";
import { Flower2 } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <Link to="/" className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
        <Flower2 className="w-6 h-6 text-primary" />
        <span className="font-medium text-lg">DailyBloom</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <Link to="/login">
          <Button variant="ghost" className="rounded-full">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
}
