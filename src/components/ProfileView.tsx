import { useState } from 'react';
import { TrendingUp, MapPin, Navigation, Droplet, Camera, Award, Gift, Lock } from 'lucide-react';
import { currentUser, mockChallenges, mockRewards } from '../data/mockData';

type StatsTab = 'weekly' | 'monthly';

export function ProfileView() {
  const [activeTab, setActiveTab] = useState<StatsTab>('weekly');

  const nextLevelPoints = currentUser.level * 200;
  const progressPercentage = (currentUser.points % 200) / 200 * 100;

  const weeklyStats = {
    points: 320,
    checkIns: 12,
    fountains: 5,
    distance: 8.4,
    liters: 24,
    contributions: 3
  };

  const monthlyStats = {
    points: currentUser.points,
    checkIns: currentUser.totalCheckIns,
    fountains: currentUser.fountainsVisited,
    distance: currentUser.distanceKm,
    liters: currentUser.litersSaved,
    contributions: currentUser.contributions
  };

  const stats = activeTab === 'weekly' ? weeklyStats : monthlyStats;

  const getIconForReward = (iconName: string) => {
    switch (iconName) {
      case 'snowflake': return '❄️';
      case 'sparkles': return '✨';
      case 'bike': return '🚲';
      case 'bus': return '🚌';
      case 'gift': return '🎁';
      default: return '🏆';
    }
  };

  return (
    <div className="h-full w-full bg-gray-50 overflow-y-auto">
      {/* Header with Dragon/Profile */}
      <div className="bg-gradient-to-br from-teal-600 to-green-600 text-white p-6 pb-12">
        <div className="flex items-center gap-4 mb-6">
          {/* Profile Photo */}
          <div className="w-20 h-20 rounded-full border-4 border-white border-opacity-30 overflow-hidden flex-shrink-0 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl">{currentUser.name} <span className="text-teal-200">lv {currentUser.level}</span></h1>
            <p className="text-teal-100 text-sm mt-1">Esploratore delle Vedovelle</p>
          </div>
        </div>

        {/* Level Progress - Box bianco semi-trasparente */}
        {/* Questo box mostra la barra di progresso del livello corrente dell'utente */}
        {/* Permette di vedere quanti punti mancano per raggiungere il prossimo livello */}
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm text-gray-900 mb-1">Esperienza</p>
              <p className="font-semibold text-lg text-gray-900">
                {currentUser.points % 200} / {200} XP
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-900">Prossimo livello</p>
              <p className="font-semibold text-2xl text-gray-900">
                {currentUser.level + 1}
              </p>
            </div>
          </div>
          
          <div className="w-full bg-black bg-opacity-20 rounded-full h-3 overflow-hidden border border-white border-opacity-30">
            <div 
              className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 h-full rounded-full transition-all duration-500 shadow-lg relative"
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse" />
            </div>
          </div>
          
          <p className="text-xs text-gray-900 mt-2 text-center">
            Ancora <span className="font-semibold text-amber-700">{200 - (currentUser.points % 200)} XP</span> per raggiungere il livello {currentUser.level + 1}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 -mt-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          {/* Tab Switch */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                activeTab === 'weekly' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Settimanale
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                activeTab === 'monthly' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Mensile
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">Punti</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stats.points}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Award className="w-5 h-5" />
                <span className="text-sm">Check-in</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stats.checkIns}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Fontanelle</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stats.fountains}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <Navigation className="w-5 h-5" />
                <span className="text-sm">Distanza</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stats.distance} km</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-teal-600 mb-2">
                <Droplet className="w-5 h-5" />
                <span className="text-sm">Litri risparmiati</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stats.liters}</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-pink-600 mb-2">
                <Camera className="w-5 h-5" />
                <span className="text-sm">Contributi</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stats.contributions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="px-6 mb-6">
        <h2 className="font-medium text-gray-900 mb-3">Sfide Attive</h2>
        <div className="space-y-3">
          {mockChallenges.map(challenge => (
            <div key={challenge.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white flex-shrink-0">
                  🎯
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                  
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progresso</span>
                      <span className="text-teal-600">{challenge.progress}/{challenge.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-green-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-amber-600 mt-2">🏆 {challenge.reward}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="px-6 pb-6">
        <h2 className="font-medium text-gray-900 mb-3">Ricompense</h2>
        <div className="space-y-3">
          {mockRewards.map(reward => (
            <div 
              key={reward.id} 
              className={`bg-white rounded-xl p-4 shadow-sm border ${
                reward.unlocked 
                  ? 'border-green-300 bg-gradient-to-r from-green-50 to-transparent' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`text-3xl flex-shrink-0 ${!reward.unlocked && 'opacity-30'}`}>
                  {reward.unlocked ? getIconForReward(reward.icon) : '🔒'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-medium ${reward.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                      {reward.title}
                    </h3>
                    {reward.unlocked && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        Sbloccato
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${reward.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                    {reward.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {reward.unlocked ? '✓' : ''} {reward.requiredUses} utilizzi richiesti
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}