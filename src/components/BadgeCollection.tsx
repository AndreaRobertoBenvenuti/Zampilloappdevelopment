import { Badge } from '../types';

interface BadgeCollectionProps {
  badges: Badge[];
  userBadges: string[];
}

export function BadgeCollection({ badges, userBadges }: BadgeCollectionProps) {
  const getRarityColor = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-500';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-400 to-purple-600';
      case 'legendary':
        return 'from-amber-400 to-orange-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300';
      case 'rare':
        return 'border-blue-400';
      case 'epic':
        return 'border-purple-400';
      case 'legendary':
        return 'border-amber-400';
      default:
        return 'border-gray-300';
    }
  };

  const getCategoryName = (category: Badge['category']) => {
    switch (category) {
      case 'explorer':
        return 'Esplorazione';
      case 'social':
        return 'Sociale';
      case 'eco':
        return 'Ecologico';
      case 'special':
        return 'Speciale';
      default:
        return 'Altro';
    }
  };

  const categories = ['explorer', 'social', 'eco', 'special'] as const;

  return (
    <div className="space-y-6">
      {categories.map(category => {
        const categoryBadges = badges.filter(b => b.category === category);
        const unlockedCount = categoryBadges.filter(b => userBadges.includes(b.id)).length;

        return (
          <div key={category}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{getCategoryName(category)}</h3>
              <span className="text-sm text-gray-600">
                {unlockedCount}/{categoryBadges.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {categoryBadges.map(badge => {
                const isUnlocked = userBadges.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`relative rounded-lg p-2.5 transition-all ${
                      isUnlocked
                        ? `border-2 ${getRarityBorder(badge.rarity)} bg-white shadow-sm`
                        : 'border border-gray-200 bg-gray-50'
                    }`}
                  >
                    {/* Rarity indicator */}
                    {isUnlocked && (
                      <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center`}>
                        {badge.rarity === 'legendary' && <span className="text-[10px]">⭐</span>}
                        {badge.rarity === 'epic' && <span className="text-[10px]">💎</span>}
                        {badge.rarity === 'rare' && <span className="text-[10px]">✨</span>}
                      </div>
                    )}

                    {/* Badge icon */}
                    <div className={`text-3xl mb-1.5 text-center ${!isUnlocked && 'opacity-30 grayscale'}`}>
                      {isUnlocked ? badge.icon : '🔒'}
                    </div>

                    {/* Badge name */}
                    <p className={`text-[11px] font-medium text-center line-clamp-2 mb-0.5 ${
                      isUnlocked ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {badge.name}
                    </p>

                    {/* Requirement */}
                    <p className={`text-[9px] text-center ${
                      isUnlocked ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {badge.requirement}
                    </p>

                    {/* Barra progressione per badge bloccati */}
                    {!isUnlocked && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-teal-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.floor(Math.random() * 80) + 10}%` }}
                          />
                        </div>
                        <p className="text-[8px] text-center text-gray-400 mt-0.5">
                          {Math.floor(Math.random() * 80) + 10}%
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
