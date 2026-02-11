import {
  ArrowLeft,
  Trophy,
  Users,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Star,
  Heart,
  MessageSquare,
  UserPlus
} from 'lucide-react';
import { mockUsers } from '../data/mockData';

interface UserProfileViewProps {
  userId: string;
  onBack: () => void;
}

// Gradienti diversi per ogni utente - Toni pastello chiari per supportare testo scuro
const avatarGradients = [
  'from-teal-400 to-green-500',
  'from-purple-400 to-pink-500',
  'from-blue-400 to-cyan-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-red-500',
];

const headerGradients = [
  'from-teal-100 to-green-100',
  'from-purple-100 to-pink-100',
  'from-blue-100 to-cyan-100',
  'from-amber-100 to-orange-100',
  'from-rose-100 to-red-100',
];

// Dati profilo estesi per ogni utente mock
const userProfiles: Record<string, {
  username: string;
  joinDate: string;
  badges: { id: string; name: string; icon: string; description: string }[];
  stats: { favoriteFountain: string; checkInStreak: number; totalContributions: number; helpfulReports: number };
  recentActivity: { id: string; type: string; fountain: string; time: string }[];
}> = {
  '1': {
    username: '@marcorossi',
    joinDate: 'Marzo 2024',
    badges: [
      { id: '1', name: 'Esploratore', icon: '🗺️', description: '50 fontanelle visitate' },
      { id: '2', name: 'Eco Warrior', icon: '🌍', description: '100 check-in' },
      { id: '3', name: 'Community Hero', icon: '⭐', description: '20 segnalazioni utili' },
    ],
    stats: { favoriteFountain: 'Vedovella del Duomo', checkInStreak: 7, totalContributions: 45, helpfulReports: 23 },
    recentActivity: [
      { id: '1', type: 'check-in', fountain: 'Vedovella Brera', time: '2h fa' },
      { id: '2', type: 'contribution', fountain: 'Vedovella Sempione', time: '1g fa' },
      { id: '3', type: 'check-in', fountain: 'Vedovella Navigli', time: '2g fa' },
    ],
  },
  '2': {
    username: '@alessiabianchi',
    joinDate: 'Aprile 2024',
    badges: [
      { id: '1', name: 'Prima Goccia', icon: '💧', description: 'Primo check-in completato' },
      { id: '2', name: 'Farfalla Sociale', icon: '🦋', description: '5 chat community' },
    ],
    stats: { favoriteFountain: 'Drago Verde Navigli', checkInStreak: 12, totalContributions: 38, helpfulReports: 15 },
    recentActivity: [
      { id: '1', type: 'check-in', fountain: 'Drago Verde Navigli', time: '1h fa' },
      { id: '2', type: 'check-in', fountain: 'Vedovella Porta Venezia', time: '5h fa' },
      { id: '3', type: 'contribution', fountain: 'Vedovella Duomo', time: '1g fa' },
    ],
  },
  '3': {
    username: '@giuliaverdi',
    joinDate: 'Maggio 2024',
    badges: [
      { id: '1', name: 'Guerriero Eco', icon: '♻️', description: '100 litri di plastica risparmiati' },
      { id: '2', name: 'Esploratore Bronze', icon: '🥉', description: '10 fontanelle visitate' },
    ],
    stats: { favoriteFountain: 'Vedovella Sempione', checkInStreak: 5, totalContributions: 32, helpfulReports: 11 },
    recentActivity: [
      { id: '1', type: 'contribution', fountain: 'Vedovella Sempione', time: '3h fa' },
      { id: '2', type: 'check-in', fountain: 'Drago Verde Brera', time: '1g fa' },
      { id: '3', type: 'check-in', fountain: 'Vedovella Isola', time: '3g fa' },
    ],
  },
  '4': {
    username: '@matteoneri',
    joinDate: 'Febbraio 2024',
    badges: [
      { id: '1', name: 'Esploratore', icon: '🗺️', description: '50 fontanelle visitate' },
      { id: '2', name: 'Gufo Notturno', icon: '🦉', description: 'Check-in notturno' },
      { id: '3', name: 'Eco Warrior', icon: '🌍', description: '100 check-in' },
    ],
    stats: { favoriteFountain: 'Drago Verde Città Studi', checkInStreak: 9, totalContributions: 41, helpfulReports: 19 },
    recentActivity: [
      { id: '1', type: 'check-in', fountain: 'Drago Verde Città Studi', time: '30min fa' },
      { id: '2', type: 'contribution', fountain: 'Vedovella Brera', time: '6h fa' },
      { id: '3', type: 'check-in', fountain: 'Vedovella Duomo', time: '1g fa' },
    ],
  },
  '5': {
    username: '@sofiaromano',
    joinDate: 'Giugno 2024',
    badges: [
      { id: '1', name: 'Prima Goccia', icon: '💧', description: 'Primo check-in completato' },
    ],
    stats: { favoriteFountain: 'Vedovella Porta Venezia', checkInStreak: 3, totalContributions: 22, helpfulReports: 8 },
    recentActivity: [
      { id: '1', type: 'check-in', fountain: 'Vedovella Porta Venezia', time: '4h fa' },
      { id: '2', type: 'check-in', fountain: 'Drago Verde Isola', time: '2g fa' },
      { id: '3', type: 'contribution', fountain: 'Vedovella Corso Buenos Aires', time: '4g fa' },
    ],
  },
};

export function UserProfileView({ userId, onBack }: UserProfileViewProps) {
  const mockUser = mockUsers.find(u => u.id === userId);
  const profile = userProfiles[userId];

  if (!mockUser || !profile) {
    return (
      <div className="h-full w-full bg-white flex flex-col items-center justify-center p-6">
        <p className="text-gray-500 mb-4">Utente non trovato</p>
        <button onClick={onBack} className="text-teal-600 font-medium">Torna alla classifica</button>
      </div>
    );
  }

  const userIndex = parseInt(userId, 10) - 1;
  const avatarGradient = avatarGradients[userIndex % avatarGradients.length];
  const headerGradient = headerGradients[userIndex % headerGradients.length];

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header */}
      <div className={`relative bg-gradient-to-br ${headerGradient} p-6 pb-20`}>
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white bg-opacity-60 backdrop-blur-md p-2 rounded-full hover:bg-opacity-80 transition-all z-10 shadow-sm"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* Profile Info */}
        <div className="mt-12 flex flex-col items-center">
          {/* Avatar */}
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white text-3xl border-4 border-white shadow-xl`}>
            {mockUser.name.charAt(0)}
          </div>

          <h1 className="mt-4 text-gray-900 text-2xl font-bold">{mockUser.name}</h1>
          <p className="text-gray-700 font-medium">{profile.username}</p>

          {/* Level Badge */}
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-60 backdrop-blur-md rounded-full border border-white border-opacity-40 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-medium text-gray-900">Livello {mockUser.level}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 -mt-6 mb-4 flex gap-3 relative z-10">
        <button className="flex-1 bg-white border-2 border-teal-600 text-teal-600 py-3 rounded-xl hover:bg-teal-50 transition-colors shadow-lg flex items-center justify-center gap-2 font-medium">
          <UserPlus className="w-5 h-5" />
          Segui
        </button>
        <button className="flex-1 bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition-colors shadow-lg flex items-center justify-center gap-2 font-medium">
          <MessageSquare className="w-5 h-5" />
          Messaggio
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Stats Grid */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Statistiche</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-4 border border-teal-100">
              <div className="flex items-center gap-2 text-teal-600 mb-2">
                <Trophy className="w-5 h-5" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{mockUser.points}</p>
              <p className="text-sm text-gray-600">Punti totali</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{mockUser.totalCheckIns}</p>
              <p className="text-sm text-gray-600">Check-in</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{profile.stats.checkInStreak}</p>
              <p className="text-sm text-gray-600">Giorni consecutivi</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{profile.badges.length}</p>
              <p className="text-sm text-gray-600">Badge guadagnati</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Badge</h3>
          <div className="space-y-3">
            {profile.badges.map((badge) => (
              <div key={badge.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                <div className="text-4xl">{badge.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{badge.name}</h4>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Informazioni</h3>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Fontanella preferita</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{profile.stats.favoriteFountain}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-4 h-4" />
                <span className="text-sm">Contributi totali</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{profile.stats.totalContributions}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Heart className="w-4 h-4" />
                <span className="text-sm">Segnalazioni utili</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{profile.stats.helpfulReports}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Membro dal</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{profile.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Attività Recenti</h3>
          <div className="space-y-3">
            {profile.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white flex-shrink-0`}>
                  {activity.type === 'check-in' ? (
                    <MapPin className="w-5 h-5" />
                  ) : (
                    <Star className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    {activity.type === 'check-in' ? 'Check-in a' : 'Contributo a'} {activity.fountain}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
