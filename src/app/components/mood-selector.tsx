import { MoodType } from "./mood-badge";
import { Sun, Flower2, Cloud, Moon, CloudDrizzle } from "lucide-react";

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onSelectMood: (mood: MoodType) => void;
}

const moods: { type: MoodType; label: string; icon: any; color: string }[] = [
  { type: "happy", label: "Happy", icon: Sun, color: "bg-[#FFF4B8] text-[#8B7F00] hover:bg-[#FFEF8F]" },
  { type: "inspired", label: "Inspired", icon: Flower2, color: "bg-[#F8C8DC] text-[#8B4A6A] hover:bg-[#F5B3CC]" },
  { type: "calm", label: "Calm", icon: Cloud, color: "bg-[#C8E0F4] text-[#4A6A8B] hover:bg-[#B3D3EB]" },
  { type: "reflective", label: "Reflective", icon: Moon, color: "bg-[#E6D8F3] text-[#6A4A8B] hover:bg-[#D9C8E8]" },
  { type: "tired", label: "Tired", icon: CloudDrizzle, color: "bg-[#E8E8E8] text-[#5A5A5A] hover:bg-[#DBDBDB]" },
];

export function MoodSelector({ selectedMood, onSelectMood }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {moods.map((mood) => {
        const Icon = mood.icon;
        const isSelected = selectedMood === mood.type;
        
        return (
          <button
            key={mood.type}
            type="button"
            onClick={() => onSelectMood(mood.type)}
            className={`
              px-4 py-2 rounded-full flex items-center gap-2
              transition-all duration-200
              ${mood.color}
              ${isSelected ? "ring-2 ring-offset-2 ring-primary scale-105" : ""}
            `}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
}
