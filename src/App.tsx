import { useState } from 'react';
import { MapView } from './components/MapView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { ChatView } from './components/ChatView';
import { SettingsView } from './components/SettingsView';
import { BottomNavigation } from './components/BottomNavigation';
import { TopBar } from './components/TopBar';

type View = 'map' | 'leaderboard' | 'profile' | 'chat' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('map');

  const renderView = () => {
    switch (currentView) {
      case 'map':
        return <MapView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'profile':
        return <ProfileView />;
      case 'chat':
        return <ChatView />;
      case 'settings':
        return <SettingsView onBack={() => setCurrentView('map')} />;
      default:
        return <MapView />;
    }
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Top Bar - Always visible */}
      <TopBar onSettingsClick={() => setCurrentView('settings')} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderView()}
      </div>
      
      {/* Bottom Navigation - Hidden on settings */}
      {currentView !== 'settings' && (
        <BottomNavigation currentView={currentView} onViewChange={setCurrentView} />
      )}
    </div>
  );
}