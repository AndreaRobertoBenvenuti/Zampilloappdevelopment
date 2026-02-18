import { useState, useEffect } from "react";
import { MapView } from "./components/MapView";
import { LeaderboardView } from "./components/LeaderboardView";
import { ProfileView } from "./components/ProfileView";
import { ChatView } from "./components/ChatView";
import { SettingsView } from "./components/SettingsView";
import { BottomNavigation } from "./components/BottomNavigation";
import { TopBar } from "./components/TopBar";
import { OnboardingTutorial } from "./components/OnboardingTutorial";

type View = "map" | "leaderboard" | "profile" | "chat" | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("map");
  const [viewParams, setViewParams] = useState<any>(null);
  const [isLandscape, setIsLandscape] = useState(false);

  // Blocca orientamento a portrait
  useEffect(() => {
    // Tenta di bloccare l'orientamento tramite Screen Orientation API
    const lockOrientation = async () => {
      try {
        const orientation = screen.orientation;
        if (orientation?.lock) {
          await orientation.lock("portrait");
        }
      } catch {
        // L'API potrebbe non essere supportata o il lock potrebbe fallire
        // in quel caso usiamo il fallback CSS/JS sotto
      }
    };
    lockOrientation();

    // Fallback: rileva orientamento e mostra avviso se landscape
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  const handleNavigate = (view: View, params?: any) => {
    setCurrentView(view);
    setViewParams(params || null);
  };

  const renderView = () => {
    switch (currentView) {
      case "map":
        return <MapView onNavigate={handleNavigate} />;
      case "leaderboard":
        return <LeaderboardView onNavigate={handleNavigate} />;
      case "profile":
        return <ProfileView />;
      case "chat":
        return <ChatView initialParams={viewParams} />;
      case "settings":
        return <SettingsView onBack={() => setCurrentView("map")} />;
      default:
        return <MapView onNavigate={handleNavigate} />;
    }
  };

  // Overlay per orientamento landscape
  if (isLandscape) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-teal-600 to-green-600 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-xl font-semibold mb-2">Ruota il dispositivo</h2>
          <p className="text-teal-100">
            Zampillo funziona meglio in modalità verticale (portrait).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Top Bar - Always visible */}
      <TopBar onSettingsClick={() => setCurrentView("settings")} />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">{renderView()}</div>

      {/* Onboarding Tutorial - Shows on first visit */}
      <OnboardingTutorial />

      {/* Bottom Navigation - Hidden on settings */}
      {currentView !== "settings" && (
        <BottomNavigation
          currentView={currentView}
          onViewChange={(view) => handleNavigate(view)}
        />
      )}
    </div>
  );
}
