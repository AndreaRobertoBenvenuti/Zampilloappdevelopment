import { MapPin, Trophy, MessageSquare } from "lucide-react";

type View = "map" | "leaderboard" | "profile" | "chat";

interface BottomNavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function BottomNavigation({
  currentView,
  onViewChange,
}: BottomNavigationProps) {
  const navItems = [
    { id: "map" as View, icon: MapPin, label: "Mappa" },
    { id: "leaderboard" as View, icon: Trophy, label: "Leaderboard" },
    { id: "chat" as View, icon: MessageSquare, label: "Chat" },
    {
      id: "profile" as View,
      icon: () => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M12 2C12 2 8 4 8 8C8 12 12 14 12 14C12 14 16 12 16 8C16 4 12 2 12 2Z" />
          <path d="M12 14C12 14 8 16 8 20C8 22 10 22 12 22C14 22 16 22 16 20C16 16 12 14 12 14Z" />
          <circle cx="10" cy="7" r="1" fill="currentColor" />
          <circle cx="14" cy="7" r="1" fill="currentColor" />
        </svg>
      ),
      label: "Profilo",
    },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 px-4 py-2 flex-shrink-0" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                isActive ? "text-teal-600" : "text-gray-500"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
