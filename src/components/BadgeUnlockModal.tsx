import { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Badge } from '../types';

interface BadgeUnlockModalProps {
  badge: Badge | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BadgeUnlockModal({ badge, isOpen, onClose }: BadgeUnlockModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !badge) return null;

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

  const getRarityText = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'Comune';
      case 'rare':
        return 'Raro';
      case 'epic':
        return 'Epico';
      case 'legendary':
        return 'Leggendario';
      default:
        return 'Sconosciuto';
    }
  };

  // Genera confetti casuali
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
    rotation: Math.random() * 360,
    color: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)]
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${piece.left}%`,
                top: '-10px',
                backgroundColor: piece.color,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
                transform: `rotate(${piece.rotation}deg)`
              }}
            />
          ))}
        </div>
      )}

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-badge-unlock">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header with gradient */}
        <div className={`bg-gradient-to-br ${getRarityColor(badge.rarity)} p-8 rounded-t-2xl text-white text-center relative overflow-hidden`}>
          {/* Sparkles effect */}
          <div className="absolute inset-0 opacity-30">
            <Sparkles className="absolute top-4 left-4 w-6 h-6 animate-pulse" />
            <Sparkles className="absolute top-8 right-8 w-4 h-4 animate-pulse delay-100" />
            <Sparkles className="absolute bottom-6 left-8 w-5 h-5 animate-pulse delay-200" />
            <Sparkles className="absolute bottom-4 right-4 w-6 h-6 animate-pulse delay-300" />
          </div>

          <h2 className="text-2xl font-bold mb-2 relative z-10">🎉 Badge Sbloccato! 🎉</h2>
          <p className="text-sm opacity-90 relative z-10">{getRarityText(badge.rarity)}</p>
        </div>

        {/* Badge Display */}
        <div className="p-8 text-center">
          {/* Badge Icon with pulse animation */}
          <div className="text-8xl mb-4 animate-bounce-slow">
            {badge.icon}
          </div>

          {/* Badge Name */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{badge.name}</h3>

          {/* Badge Description */}
          <p className="text-gray-600 mb-4">{badge.description}</p>

          {/* Requirement */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Completato:</span> {badge.requirement}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className={`w-full bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all`}
          >
            Fantastico!
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes badge-unlock {
          0% {
            transform: scale(0.5) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-badge-unlock {
          animation: badge-unlock 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
