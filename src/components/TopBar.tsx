import { Droplet, Settings } from 'lucide-react';

interface TopBarProps {
  onSettingsClick: () => void;
}

export function TopBar({ onSettingsClick }: TopBarProps) {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-4 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <Droplet className="w-5 h-5 text-teal-600 fill-teal-600" />
        </div>
        <span className="font-semibold">Zampillo</span>
      </div>

      {/* Settings */}
      <button 
        onClick={onSettingsClick}
        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
        aria-label="Impostazioni"
      >
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );
}
