import { X, MapPin, QrCode, Target, Camera, Calendar } from 'lucide-react';

interface EarnPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const earningMethods = [
  {
    icon: MapPin,
    title: 'Check-in alle Fontanelle',
    description: 'Avvicinati a una fontanella e fai check-in per guadagnare punti',
    points: '+15 punti',
    color: 'from-teal-50 to-teal-100',
    iconColor: 'text-teal-600',
    badgeColor: 'bg-teal-100 text-teal-700',
  },
  {
    icon: QrCode,
    title: 'Scansione QR Code',
    description: 'Scansiona il codice QR sulla vedovella per ottenere punti bonus',
    points: '+25 punti',
    color: 'from-blue-50 to-blue-100',
    iconColor: 'text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Target,
    title: 'Sfide Settimanali',
    description: 'Completa le sfide attive per guadagnare XP e badge speciali',
    points: 'Fino a +100 punti',
    color: 'from-purple-50 to-purple-100',
    iconColor: 'text-purple-600',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    icon: Camera,
    title: 'Contributi Community',
    description: 'Condividi foto, segnala problemi e partecipa alle chat',
    points: '+10 punti',
    color: 'from-pink-50 to-pink-100',
    iconColor: 'text-pink-600',
    badgeColor: 'bg-pink-100 text-pink-700',
  },
  {
    icon: Calendar,
    title: 'Partecipa agli Eventi',
    description: 'Unisciti agli eventi della community per bonus punti',
    points: '+20 punti',
    color: 'from-amber-50 to-amber-100',
    iconColor: 'text-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
];

export function EarnPointsModal({ isOpen, onClose }: EarnPointsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-md bg-black/20 z-50 flex items-end sm:items-center sm:justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-3xl z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-lg">💰</span>
            </div>
            <h2 className="text-gray-900 font-semibold">Come guadagnare punti?</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {earningMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.title}
                className={`bg-gradient-to-br ${method.color} rounded-xl p-4 border border-gray-100`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm ${method.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium text-gray-900">{method.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${method.badgeColor}`}>
                        {method.points}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-amber-800">
              I punti accumulati possono essere usati nel Negozio Premi per riscattare sconti e vantaggi esclusivi!
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="p-5 pt-0">
          <button
            onClick={onClose}
            className="w-full py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
          >
            Ho capito!
          </button>
        </div>
      </div>
    </div>
  );
}
