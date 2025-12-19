import { useState } from 'react';
import { Search, MapPin, Navigation, Plus, Minus, X, Camera, Locate } from 'lucide-react';
import imgBasemapImage from "figma:asset/aa3894456ae07607cc5257afcdbe2ccd7daa9e83.png";
import { mockFountains } from '../data/mockData';
import { Fountain } from '../types';
import { FountainDetailView } from './FountainDetailView';

export function MapView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFountain, setSelectedFountain] = useState<Fountain | null>(null);
  const [showPopup, setShowPopup] = useState<Fountain | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [userLocation] = useState({ lat: 45.4642, lng: 9.1900 }); // Centro Milano
  const [zoom, setZoom] = useState(1.2);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const calculateDistance = (fountain: Fountain) => {
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

  const getWalkingTime = (distanceMeters: number) => {
    const walkingSpeedKmH = 5;
    const timeMinutes = (distanceMeters / 1000) / walkingSpeedKmH * 60;
    return Math.round(timeMinutes);
  };

  const filteredFountains = mockFountains.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkerClick = (fountain: Fountain) => {
    setShowPopup(fountain);
  };

  const handleDetailsClick = () => {
    setSelectedFountain(showPopup);
    setShowDetailModal(true);
    setShowPopup(null);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Ottima': return 'bg-green-500';
      case 'Buona': return 'bg-blue-500';
      case 'Discreta': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleQRScan = () => {
    alert('Fotocamera QR Code: Inquadra il codice QR su una vedovella per accedere rapidamente alle sue informazioni!');
  };

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.3, 2.5));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.3, 0.6));
  const handleRecenter = () => {
    setZoom(1.2);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button[data-marker]')) {
      return; // Non iniziare il drag se si clicca su un marker
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button[data-marker]')) {
      return;
    }
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPanOffset({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Se stiamo mostrando i dettagli, renderizza solo quello
  if (showDetailModal && selectedFountain) {
    return (
      <FountainDetailView
        fountain={selectedFountain}
        distance={calculateDistance(selectedFountain)}
        onBack={() => {
          setShowDetailModal(false);
          setSelectedFountain(null);
        }}
      />
    );
  }

  return (
    <div className="h-full w-full relative">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-3 flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cerca vedovella per nome..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* QR Code Scanner Button */}
      <div className="absolute top-20 right-4 z-10">
        <button 
          onClick={handleQRScan}
          className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
          title="Scansiona QR Code"
        >
          <Camera className="w-6 h-6 text-teal-600" />
        </button>
      </div>

      {/* Map Area */}
      <div 
        className="h-full w-full relative overflow-hidden cursor-grab active:cursor-grabbing bg-gray-100"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="absolute inset-0 transition-transform duration-200"
          style={{ 
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Real Map from Figma */}
          <div className="relative min-w-full min-h-full flex items-center justify-center">
            <img 
              src={imgBasemapImage} 
              alt="Mappa di Milano" 
              className="pointer-events-none select-none"
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: 'none'
              }}
              draggable={false}
            />

            {/* User Location - Centro della mappa */}
            <div 
              className="absolute z-20"
              style={{ 
                left: '50%', 
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative">
                <div className="w-5 h-5 bg-blue-600 rounded-full border-3 border-white shadow-lg" />
                <div className="absolute inset-0 w-5 h-5 bg-blue-400 rounded-full animate-ping" />
              </div>
            </div>

            {/* Fountain Markers - Posizionati geograficamente sulla vera mappa */}
            {filteredFountains.map((fountain, index) => {
              const distance = calculateDistance(fountain);
              // Posizioni basate sulla geografia reale di Milano nella mappa
              const positions = [
                { left: '70%', top: '52%' },   // Centro/Duomo area
                { left: '38%', top: '48%' },   // Brera
                { left: '32%', top: '35%' },   // Parco Sempione
                { left: '28%', top: '78%' },   // Navigli/Porta Genova
                { left: '78%', top: '35%' },   // Porta Venezia
                { left: '72%', top: '42%' },   // Giardini Pubblici
                { left: '48%', top: '68%' },   // Porta Romana
                { left: '60%', top: '50%' },   // San Babila
              ];
              
              return (
                <button
                  key={fountain.id}
                  data-marker="true"
                  onClick={() => handleMarkerClick(fountain)}
                  className="absolute z-10 transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-125 pointer-events-auto"
                  style={positions[index % positions.length]}
                >
                  <div className="relative">
                    {/* Marker SVG personalizzato */}
                    <svg 
                      width="40" 
                      height="48" 
                      viewBox="0 0 24 32" 
                      className="drop-shadow-lg"
                    >
                      <path 
                        d="M12 0C7.589 0 4 3.589 4 8c0 5.5 8 14 8 14s8-8.5 8-14c0-4.411-3.589-8-8-8z" 
                        fill="#14b8a6"
                        stroke="#0f766e"
                        strokeWidth="1.5"
                      />
                      <circle 
                        cx="12" 
                        cy="8" 
                        r="3" 
                        fill="white"
                      />
                    </svg>
                    {distance < 500 && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fountain Popup */}
        {showPopup && (
          <div className="absolute bottom-1 left-4 right-4 z-30">
            <div className="bg-white rounded-xl shadow-2xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{showPopup.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-white text-xs ${getConditionColor(showPopup.condition)}`}>
                      {showPopup.condition}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPopup(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{calculateDistance(showPopup)}m</span>
                </div>
                <div className="flex items-center gap-1">
                  <Navigation className="w-4 h-4" />
                  <span>{getWalkingTime(calculateDistance(showPopup))} min a piedi</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={handleDetailsClick}
                  className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Dettagli
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Indicazioni
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 bottom-32 z-10 flex flex-col gap-2">
        <button 
          onClick={handleRecenter}
          className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
          title="Centra mappa"
        >
          <Locate className="w-5 h-5 text-teal-600" />
        </button>
        <button 
          onClick={handleZoomIn}
          className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-700" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
        >
          <Minus className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}