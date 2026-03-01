import { Link } from "react-router";
import { Card } from "./ui/card";
import { MoodBadge, MoodType } from "./mood-badge";
import { Calendar } from "lucide-react";

interface JournalCardProps {
  id: string;
  title: string;
  mood: MoodType;
  date: string;
  preview: string;
}

export function JournalCard({ id, title, mood, date, preview }: JournalCardProps) {
  return (
    <Link to={`/journal/${id}`}>
      <Card className="p-6 rounded-3xl border-border hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white cursor-pointer group">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg flex-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <MoodBadge mood={mood} size="sm" />
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {preview}
          </p>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
