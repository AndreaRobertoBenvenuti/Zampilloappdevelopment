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

interface UserProfileViewProps {
  userId: string;
  onBack: () => void;
}

export function UserProfileView({ userId, onBack }: UserProfileViewProps) {
  // Mock user data - in produzione verrebbe caricato dall'API
  const user = {
    id: userId,
    name: 'Marco Rossi',
    username: '@marcorossi',
    level: 12,
    points: 3450,
    totalCheckIns: 156,
    joinDate: 'Marzo 2024',
    badges: [
      { id: '1', name: 'Esploratore', icon: '🗺️', description: '50 fontanelle visitate' },
      { id: '2', name: 'Eco Warrior', icon: '🌍', description: '100 check-in' },
      { id: '3', name: 'Community Hero', icon: '⭐', description: '20 segnalazioni utili' },
    ],
    stats: {
      favoriteFountain: 'Vedovella del Duomo',
      checkInStreak: 7,
      totalContributions: 45,
      helpfulReports: 23,
    },
    recentActivity: [
      { id: '1', type: 'check-in', fountain: 'Vedovella Brera', time: '2h fa' },
      { id: '2', type: 'contribution', fountain: 'Vedovella Sempione', time: '1g fa' },
      { id: '3', type: 'check-in', fountain: 'Vedovella Navigli', time: '2g fa' },
    ]
  };

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-teal-600 to-green-600 text-white p-6 pb-20">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-30 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Profile Info */}
        <div className="mt-12 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-white text-3xl border-4 border-white border-opacity-30">
            {user.name.charAt(0)}
          </div>
          
          <h1 className="mt-4 text-white">{user.name}</h1>
          <p className="text-teal-100">{user.username}</p>
          
          {/* Level Badge */}
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full">
            <Trophy className="w-5 h-5" />
            <span>Livello {user.level}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 -mt-6 mb-4 flex gap-3 relative z-10">
        <button className="flex-1 bg-white border-2 border-teal-600 text-teal-600 py-3 rounded-xl hover:bg-teal-50 transition-colors shadow-lg flex items-center justify-center gap-2">
          <UserPlus className="w-5 h-5" />
          Segui
        </button>
        <button className="flex-1 bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition-colors shadow-lg flex items-center justify-center gap-2">
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
              <p className="text-2xl font-semibold text-gray-900">{user.points}</p>
              <p className="text-sm text-gray-600">Punti totali</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{user.totalCheckIns}</p>
              <p className="text-sm text-gray-600">Check-in</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{user.stats.checkInStreak}</p>
              <p className="text-sm text-gray-600">Giorni consecutivi</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{user.badges.length}</p>
              <p className="text-sm text-gray-600">Badge guadagnati</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Badge</h3>
          <div className="space-y-3">
            {user.badges.map((badge) => (
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
              <span className="text-sm font-medium text-gray-900">{user.stats.favoriteFountain}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-4 h-4" />
                <span className="text-sm">Contributi totali</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{user.stats.totalContributions}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Heart className="w-4 h-4" />
                <span className="text-sm">Segnalazioni utili</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{user.stats.helpfulReports}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Membro dal</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{user.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Attività Recenti</h3>
          <div className="space-y-3">
            {user.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center text-white flex-shrink-0">
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
