import {
  ArrowLeft,
  MapPin,
  Droplet,
  Calendar,
  Users,
  Camera,
  MessageSquare,
  Navigation,
  Clock,
  TrendingUp,
  AlertCircle,
  Share2,
  Heart,
  Star,
  Thermometer,
  Wind,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';
import { Fountain } from '../types';
import { ReportProblemDialog } from './ReportProblemDialog';

interface FountainDetailViewProps {
  fountain: Fountain;
  distance: number;
  onBack: () => void;
}

export function FountainDetailView({ fountain, distance, onBack }: FountainDetailViewProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Ottima': return 'bg-green-500';
      case 'Buona': return 'bg-blue-500';
      case 'Discreta': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getWalkingTime = (distanceMeters: number) => {
    const walkingSpeedKmH = 5;
    const timeMinutes = (distanceMeters / 1000) / walkingSpeedKmH * 60;
    return Math.round(timeMinutes);
  };

  const handleCheckIn = () => {
    alert('Check-in completato! +15 punti guadagnati! 🎉');
  };

  const handleJoinChat = () => {
    alert(`Ti sei unito alla chat "${fountain.name}"!`);
  };

  const handleShare = () => {
    alert('Condividi questa fontanella con gli amici!');
  };

  const handleNavigate = () => {
    // Apre Google Maps con navigazione verso la fontanella
    const url = `https://www.google.com/maps/dir/?api=1&destination=${fountain.lat},${fountain.lng}`;
    window.open(url, '_blank');
  };

  // Mock data per attività recenti
  const recentActivity = [
    { id: '1', user: 'Marco R.', action: 'Check-in', time: '5 min fa' },
    { id: '2', user: 'Giulia B.', action: 'Foto condivisa', time: '12 min fa' },
    { id: '3', user: 'Alessandro V.', action: 'Check-in', time: '1h fa' },
    { id: '4', user: 'Sofia M.', action: 'Recensione', time: '2h fa' },
  ];

  // Mock data per eventi
  const upcomingEvents = [
    { id: '1', title: 'Pulizia Community', date: '24 Dic', time: '10:00', participants: 12 },
    { id: '2', title: 'Running Group', date: '26 Dic', time: '7:30', participants: 8 },
  ];

  const [isReportDialogOpen, setReportDialogOpen] = useState(false);

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header Image */}
      <div className="relative w-full h-64 bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center flex-shrink-0">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all z-10"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* Share & Favorite */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={handleShare}
            className="bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all"
          >
            <Share2 className="w-5 h-5 text-gray-900" />
          </button>
          <button className="bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all">
            <Heart className="w-5 h-5 text-red-500" />
          </button>
        </div>

        {/* Fountain Icon */}
        <Droplet className="w-24 h-24 text-white opacity-50" />

        {/* Condition Badge - Bottom Left */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-white text-sm font-medium ${getConditionColor(fountain.condition)} shadow-lg`}>
            {fountain.condition}
          </span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Title & Info */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-gray-900 mb-3">{fountain.name}</h1>
          
          {/* Quick Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{distance}m da te</span>
            </div>
            <div className="flex items-center gap-1">
              <Navigation className="w-4 h-4" />
              <span>{getWalkingTime(distance)} min a piedi</span>
            </div>
            {fountain.yearInstalled && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{fountain.yearInstalled}</span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600">(4.8 · 234 recensioni)</span>
          </div>
        </div>

        {/* Description */}
        {fountain.description && (
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Descrizione</h3>
            <p className="text-gray-700">{fountain.description}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Statistiche</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-4 border border-teal-100">
              <div className="flex items-center gap-2 text-teal-600 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Check-in</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{fountain.checkIns}</p>
              <p className="text-sm text-gray-600 mt-1">Visite totali</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Camera className="w-5 h-5" />
                <span className="text-sm font-medium">Contributi</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{fountain.contributions}</p>
              <p className="text-sm text-gray-600 mt-1">Dalla community</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-medium">Chat</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">234</p>
              <p className="text-sm text-gray-600 mt-1">Membri attivi</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Tendenza</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">+12%</p>
              <p className="text-sm text-gray-600 mt-1">Questa settimana</p>
            </div>
          </div>
        </div>

        {/* Water Quality */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Qualità dell'Acqua</h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Droplet className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 mb-1">Acqua Potabile Certificata</h4>
                <p className="text-sm text-blue-800">
                  L'acqua delle vedovelle è controllata quotidianamente dall'Istituto Superiore di Sanità (ISS) 
                  e rispetta tutti i parametri di qualità per l'acqua potabile.
                </p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
            </div>
          </div>

          {/* Parametri Acqua */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Temperatura</span>
              </div>
              <span className="text-sm font-medium text-gray-900">12-14°C</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Pressione</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Ottimale</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Ultimo controllo</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Oggi, 6:00</span>
            </div>
          </div>
        </div>

        {/* Historical Info */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Storia</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-900">
              Le vedovelle o "draghi verdi" sono le iconiche fontanelle pubbliche di Milano, 
              prodotte dalle Fonderie Lamperti dal 1908. Il loro design in ghisa con testa di drago 
              è diventato un simbolo della città.
            </p>
            {fountain.yearInstalled && (
              <p className="text-sm text-amber-800 mt-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Questa fontanella è stata installata nel <strong>{fountain.yearInstalled}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Eventi in Programma</h3>
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-teal-900">{event.title}</h4>
                    <span className="text-xs text-teal-700 bg-teal-100 px-2 py-1 rounded-full">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-teal-700">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{event.participants} partecipanti</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Attività Recenti</h3>
          <div className="space-y-3">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center text-white text-sm flex-shrink-0">
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> · {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility & Services */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Servizi & Accessibilità</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Accessibile H24</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Illuminata</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Disabili</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>QR Code</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleNavigate}
              className="w-full flex items-center justify-center gap-2 text-teal-700 bg-teal-50 border border-teal-200 py-3 rounded-lg hover:bg-teal-100 transition-colors font-medium"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Indicazioni</span>
            </button>
            <button
              onClick={() => setReportDialogOpen(true)}
              className="w-full flex items-center justify-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 py-3 rounded-lg hover:bg-amber-100 transition-colors font-medium"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Segnala Problema</span>
            </button>
          </div>
        </div>

        {/* Bottom Spacing for fixed buttons */}
        <div className="h-24" />
      </div>

      {/* Fixed Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex gap-3">
          <button
            onClick={handleCheckIn}
            className="flex-1 bg-gradient-to-r from-teal-600 to-green-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            Check-in (+15 punti)
          </button>
          <button
            onClick={handleJoinChat}
            className="px-4 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors flex items-center justify-center"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Report Problem Dialog */}
      <ReportProblemDialog
        isOpen={isReportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        fountainName={fountain.name}
      />
    </div>
  );
}