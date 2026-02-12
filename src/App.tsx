import { useState } from 'react';
import { MapView } from './components/MapView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { ChatView } from './components/ChatView';
import { SettingsView } from './components/SettingsView';
import { BottomNavigation } from './components/BottomNavigation';
import { TopBar } from './components/TopBar';
import { OnboardingTutorial } from './components/OnboardingTutorial';

type View = 'map' | 'leaderboard' | 'profile' | 'chat' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('map');
  const [viewParams, setViewParams] = useState<any>(null);

  const handleNavigate = (view: View, params?: any) => {
    setCurrentView(view);
    setViewParams(params || null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'map':
        return <MapView onNavigate={handleNavigate} />;
      case 'leaderboard':
        return <LeaderboardView onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileView />;
      case 'chat':
        return <ChatView initialParams={viewParams} />;
      case 'settings':
        return <SettingsView onBack={() => setCurrentView('map')} />;
      default:
        return <MapView onNavigate={handleNavigate} />;
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
        <BottomNavigation currentView={currentView} onViewChange={(view) => handleNavigate(view)} />
      )}

      {/* Onboarding Tutorial - Shows on first visit */}
      <OnboardingTutorial />
    </div>
  );
}
