import { X, MapPin, Droplet, Calendar, Users, Camera, MessageSquare } from 'lucide-react';
import { Fountain } from '../types';

interface FountainDetailModalProps {
  fountain: Fountain;
  distance: number;
  onClose: () => void;
}

export function FountainDetailModal({ fountain, distance, onClose }: FountainDetailModalProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Ottima': return 'bg-green-500';
      case 'Buona': return 'bg-blue-500';
      case 'Discreta': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleJoinChat = () => {
    // In una vera app, qui si unirebbe/creerebbe la chat
    console.log('Unirsi alla chat della fontanella:', fountain.id);
    alert(`Ti sei unito alla chat "${fountain.name}"!`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-gray-900">{fountain.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Image placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
          <Droplet className="w-16 h-16 text-white opacity-50" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-white text-sm ${getConditionColor(fountain.condition)}`}>
              Qualità: {fountain.condition}
            </span>
            <span className="text-sm text-gray-600">{distance}m da te</span>
          </div>

          {/* Description */}
          {fountain.description && (
            <div>
              <p className="text-gray-700">{fountain.description}</p>
              {fountain.yearInstalled && (
                <p className="text-sm text-gray-500 mt-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Installata nel {fountain.yearInstalled}
                </p>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-teal-600 mb-1">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{fountain.checkIns}</p>
              <p className="text-sm text-gray-600">Check-in totali</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-teal-600 mb-1">
                <Camera className="w-5 h-5" />
              </div>
              <p className="text-2xl font-semibold text-gray-900">{fountain.contributions}</p>
              <p className="text-sm text-gray-600">Contributi</p>
            </div>
          </div>

          {/* Water Quality Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Droplet className="w-5 h-5" />
              Qualità dell'Acqua
            </h3>
            <p className="text-sm text-blue-800">
              L'acqua delle vedovelle è controllata quotidianamente dall'Istituto Superiore di Sanità (ISS) 
              e rispetta tutti i parametri di qualità per l'acqua potabile.
            </p>
          </div>

          {/* Historical Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-medium text-amber-900 mb-2">Storia</h3>
            <p className="text-sm text-amber-800">
              Le vedovelle o "draghi verdi" sono le iconiche fontanelle pubbliche di Milano, 
              prodotte dalle Fonderie Lamperti dal 1908. Il loro design in ghisa con testa di drago 
              è diventato un simbolo della città.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors">
              Check-in
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" />
                Aggiungi Foto
              </button>
              <button 
                onClick={handleJoinChat}
                className="bg-teal-100 text-teal-700 py-3 rounded-lg hover:bg-teal-200 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}