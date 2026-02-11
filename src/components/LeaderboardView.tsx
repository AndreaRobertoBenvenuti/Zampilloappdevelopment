import { useState, useMemo } from 'react';
import { Trophy, Users, MapPin, TrendingUp } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { loadMilanFountains } from '../utils/fountainDataLoader';
import { FountainDetailView } from './FountainDetailView';
import { UserProfileView } from './UserProfileView';
import { useFavorites } from '../hooks/useFavorites';
import { Fountain } from '../types';

type LeaderboardTab = 'fountains' | 'users';
type ViewMode = 'leaderboard' | 'fountain-detail' | 'user-profile';

export function LeaderboardView() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('fountains');
  const [viewMode, setViewMode] = useState<ViewMode>('leaderboard');
  const [selectedFountain, setSelectedFountain] = useState<Fountain | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const sortedFountains = useMemo(
    () => [...loadMilanFountains()].sort((a, b) => b.checkIns - a.checkIns),
    []
  );
  const sortedUsers = [...mockUsers].sort((a, b) => b.points - a.points);

  const getMedalEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}°`;
  };

  const calculateDistance = (fountain: Fountain) => {
    // Mock distance calculation - in produzione userebbe la posizione reale dell'utente
    const userLocation = { lat: 45.4642, lng: 9.1900 }; // Centro Milano
    const R = 6371;
    const dLat = (fountain.lat - userLocation.lat) * Math.PI / 180;
    const dLng = (fountain.lng - userLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(fountain.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c * 1000;
    return Math.round(distance);
  };

  const handleFountainClick = (fountain: Fountain) => {
    setSelectedFountain(fountain);
    setViewMode('fountain-detail');
  };

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    setViewMode('user-profile');
  };

  const handleBackToLeaderboard = () => {
    setViewMode('leaderboard');
    setSelectedFountain(null);
    setSelectedUserId(null);
  };

  // Show fountain detail view
  if (viewMode === 'fountain-detail' && selectedFountain) {
    return (
      <FountainDetailView
        fountain={selectedFountain}
        distance={calculateDistance(selectedFountain)}
        onBack={handleBackToLeaderboard}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    );
  }

  // Show user profile view
  if (viewMode === 'user-profile' && selectedUserId) {
    return (
      <UserProfileView
        userId={selectedUserId}
        onBack={handleBackToLeaderboard}
      />
    );
  }

  // Show leaderboard
  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6" />
          <h1>Community</h1>
        </div>
        <p className="text-teal-50">
          Scopri le fontanelle più amate e gli utenti più attivi di Milano
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => setActiveTab('fountains')}
          className={`flex-1 py-4 transition-colors relative ${
            activeTab === 'fountains' 
              ? 'text-teal-600' 
              : 'text-gray-500'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" />
            Fontanelle
          </span>
          {activeTab === 'fountains' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-4 transition-colors relative ${
            activeTab === 'users' 
              ? 'text-teal-600' 
              : 'text-gray-500'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Users className="w-5 h-5" />
            Utenti
          </span>
          {activeTab === 'users' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {activeTab === 'fountains' ? (
          <>
            {sortedFountains.map((fountain, index) => (
              <div 
                key={fountain.id}
                className={`bg-white border rounded-xl p-4 transition-all hover:shadow-md ${
                  index < 3 ? 'border-amber-300 bg-gradient-to-r from-amber-50 to-transparent' : 'border-gray-200'
                }`}
                onClick={() => handleFountainClick(fountain)}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="text-2xl min-w-[3rem] text-center">
                    {getMedalEmoji(index)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{fountain.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {fountain.checkIns} check-in
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {fountain.contributions} contributi
                      </span>
                    </div>
                  </div>

                  {/* Condition Badge */}
                  <div className={`px-2 py-1 rounded-full text-xs text-white ${
                    fountain.condition === 'Ottima' ? 'bg-green-500' :
                    fountain.condition === 'Buona' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}>
                    {fountain.condition}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {sortedUsers.map((user, index) => (
              <div 
                key={user.id}
                className={`bg-white border rounded-xl p-4 transition-all hover:shadow-md ${
                  index < 3 ? 'border-amber-300 bg-gradient-to-r from-amber-50 to-transparent' : 'border-gray-200'
                }`}
                onClick={() => handleUserClick(user.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div className="text-2xl min-w-[3rem] text-center pt-2">
                    {getMedalEmoji(index)}
                  </div>

                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center text-white flex-shrink-0 text-xl">
                    {user.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                    </div>
                    
                    {/* Level Badge */}
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-sm mb-2">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Livello {user.level}</span>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <span className="text-gray-900 font-medium">{user.points}</span>
                        <span>punti</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-3.5 h-3.5" />
                        <span>{user.totalCheckIns} check-in</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}