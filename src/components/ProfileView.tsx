import { useState } from 'react';
import { TrendingUp, MapPin, Navigation, Droplet, Camera, Award, Gift, Lock, Coins, ShoppingBag } from 'lucide-react';
import { currentUser, mockChallenges, mockRewards, mockBadges } from '../data/mockData';
import { BadgeCollection } from './BadgeCollection';
import { ActivityChart } from './ActivityChart';
import { BadgeUnlockModal } from './BadgeUnlockModal';
import { EarnPointsModal } from './EarnPointsModal';
import { Badge, Reward } from '../types';

type StatsTab = 'weekly' | 'monthly';

export function ProfileView() {
  const [activeTab, setActiveTab] = useState<StatsTab>('weekly');
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [userSpendablePoints, setUserSpendablePoints] = useState(currentUser.spendablePoints);
  const [showEarnModal, setShowEarnModal] = useState(false);

  const handleBadgeClick = (badge: Badge) => {
    if (!currentUser.badges?.includes(badge.id)) {
      setUnlockedBadge(badge);
      setShowUnlockModal(true);
    }
  };

  const handleRedeemReward = (reward: Reward) => {
    if (reward.type === 'consumable' && reward.cost) {
      if (userSpendablePoints >= reward.cost) {
        if (confirm(`Vuoi riscattare "${reward.title}" per ${reward.cost} punti?`)) {
          setUserSpendablePoints(prev => prev - (reward.cost || 0));
          alert(`Hai riscattato: ${reward.title}! Il codice è stato inviato alla tua email.`);
        }
      } else {
        alert(`Non hai abbastanza punti per riscattare questo premio. Te ne mancano ${reward.cost - userSpendablePoints}.`);
      }
    }
  };

  const nextLevelPoints = currentUser.level * 200;
  const progressPercentage = (currentUser.points % 200) / 200 * 100;

  // Dati attività settimanale per grafico
  const weeklyActivity = [
    { day: 'Lun', value: 3 },
    { day: 'Mar', value: 5 },
    { day: 'Mer', value: 2 },
    { day: 'Gio', value: 7 },
    { day: 'Ven', value: 4 },
    { day: 'Sab', value: 8 },
    { day: 'Dom', value: 6 }
  ];

  const weeklyStats = {
    points: 550,
    checkIns: 35,
    fountains: 12,
    distance: 15.2,
    liters: 18,
    contributions: 5
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

  const monthlyActivity = [
    { day: 'Sett 1', value: 18 },
    { day: 'Sett 2', value: 25 },
    { day: 'Sett 3', value: 22 },
    { day: 'Sett 4', value: 24 }
  ];

  const getIconForReward = (iconName: string) => {
    switch (iconName) {
      case 'map': return '🗺️';
      case 'chart': return '📊';
      case 'bike': return '🚲';
      case 'bus': return '🚌';
      case 'gift': return '🎁';
      default: return '🏆';
    }
  };

  const permanentRewards = mockRewards.filter(r => r.type === 'permanent');
  const consumableRewards = mockRewards.filter(r => r.type === 'consumable');

  return (
    <div className="h-full w-full bg-gray-50 overflow-y-auto">
      {/* Header with Dragon/Profile */}
      <div className="bg-gradient-to-br from-teal-600 to-green-600 text-white p-6 pb-12">
        <div className="flex items-center gap-4 mb-6">
          {/* Profile Photo */}
          <div className="w-20 h-20 rounded-full border-4 border-white border-opacity-30 overflow-hidden flex-shrink-0 shadow-lg">
            <img
              src={currentUser.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl">{currentUser.name} <span className="text-teal-200">lv {currentUser.level}</span></h1>
            <p className="text-teal-100 text-sm mt-1">Esploratore delle Vedovelle</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm text-gray-900 mb-1">Esperienza Livello</p>
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
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse" />
            </div>
          </div>
          
          <p className="text-xs text-gray-900 mt-2 text-center">
            Ancora <span className="font-semibold text-amber-700">{200 - (currentUser.points % 200)} XP</span> per il livello successivo
          </p>
        </div>
      </div>

      {/* Points Balance Card */}
      <div className="px-6 -mt-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-amber-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Saldo Punti Zampillo</p>
                <p className="text-2xl font-bold text-gray-900">{userSpendablePoints}</p>
              </div>
            </div>
            <button
              onClick={() => setShowEarnModal(true)}
              className="bg-amber-50 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              Come guadagnare?
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 mb-6">
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
                <span className="text-sm">XP Guadagnati</span>
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

          {/* Grafico Attività */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Attività Check-in</h3>
            <ActivityChart data={activeTab === 'weekly' ? weeklyActivity : monthlyActivity} />
          </div>
        </div>
      </div>

      {/* Rewards Section - Split into Permanent and Consumable */}
      <div className="px-6 pb-6">
        <h2 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Lock className="w-5 h-5 text-teal-600" />
          Funzionalità Sbloccabili
        </h2>
        <div className="space-y-3 mb-6">
          {permanentRewards.map(reward => (
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
                  <p className="text-xs text-gray-500 mt-1">
                    Richiede livello {reward.requiredLevel} o {reward.requiredUses} utilizzi
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-amber-600" />
          Negozio Premi
        </h2>
        <div className="space-y-3">
          {consumableRewards.map(reward => (
            <div 
              key={reward.id} 
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl flex-shrink-0">
                  {getIconForReward(reward.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <Coins className="w-4 h-4" />
                      {reward.cost}
                    </span>
                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={userSpendablePoints < (reward.cost || 0)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        userSpendablePoints >= (reward.cost || 0)
                          ? 'bg-amber-500 text-gray-900 hover:bg-amber-600 shadow-sm'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Riscatta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium text-gray-900">Badge Collezione</h2>
          <span className="text-sm px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">
            {currentUser.badges?.length || 0}/{mockBadges.length}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <BadgeCollection
            badges={mockBadges}
            userBadges={currentUser.badges || []}
            onBadgeClick={handleBadgeClick}
          />
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

      {/* Badge Unlock Modal */}
      <BadgeUnlockModal
        badge={unlockedBadge}
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
      />

      {/* Earn Points Modal */}
      <EarnPointsModal
        isOpen={showEarnModal}
        onClose={() => setShowEarnModal(false)}
      />
    </div>
  );
}
