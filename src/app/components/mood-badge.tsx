import { Sun, Flower2, Cloud, Moon, CloudDrizzle } from "lucide-react";

export type MoodType = "happy" | "inspired" | "calm" | "reflective" | "tired";

interface MoodBadgeProps {
  mood: MoodType;
  size?: "sm" | "md" | "lg";
}

const moodConfig = {
  happy: {
    label: "Happy",
    icon: Sun,
    color: "bg-[#FFF4B8] text-[#8B7F00]",
  },
  inspired: {
    label: "Inspired",
    icon: Flower2,
    color: "bg-[#F8C8DC] text-[#8B4A6A]",
  },
  calm: {
    label: "Calm",
    icon: Cloud,
    color: "bg-[#C8E0F4] text-[#4A6A8B]",
  },
  reflective: {
    label: "Reflective",
    icon: Moon,
    color: "bg-[#E6D8F3] text-[#6A4A8B]",
  },
  tired: {
    label: "Tired",
    icon: CloudDrizzle,
    color: "bg-[#E8E8E8] text-[#5A5A5A]",
  },
};

export function MoodBadge({ mood, size = "md" }: MoodBadgeProps) {
  const config = moodConfig[mood];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
  };
  
  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };
  
  return (
    <span className={`inline-flex items-center rounded-full ${config.color} ${sizeClasses[size]}`}>
      <Icon className={iconSizes[size]} />
      <span>{config.label}</span>
    </span>
  );
}
