import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Search, MapPin, Navigation, X, Camera, Locate } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { loadMilanFountains } from '../utils/fountainDataLoader';
import { Fountain } from '../types';
import { FountainDetailView } from './FountainDetailView';

const GOOGLE_MAPS_API_KEY = 'AIzaSyARUY0tCHG2jJBP0nHuHKL1REFDd0he-gg';

// Librerie Google Maps - DEVE essere una costante fuori dal componente
const libraries: ("places")[] = ["places"];

// Centro Milano (Piazza Duomo)
const milanCenter = {
  lat: 45.4642,
  lng: 9.1900
};

// Stile custom della mappa (verde acqua per abbinarsi al tema)
const mapStyles = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a2dcd7' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#d4edda' }]
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  gestureHandling: 'greedy' as const,
};

export function MapView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFountain, setSelectedFountain] = useState<Fountain | null>(null);
  const [showPopup, setShowPopup] = useState<Fountain | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [userLocation] = useState(milanCenter);
  const [mapZoom, setMapZoom] = useState(14);
  const [fountains, setFountains] = useState<Fountain[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

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

  useEffect(() => {
    loadMilanFountains().then(data => setFountains(data));
  }, []);

  const filteredFountains = fountains.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkerClick = (fountain: Fountain) => {
    setShowPopup(fountain);
    // Centra la mappa sul marker cliccato
    if (mapRef.current) {
      mapRef.current.panTo({ lat: fountain.lat, lng: fountain.lng });
    }
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

  const handleZoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom() || 14;
      mapRef.current.setZoom(currentZoom + 1);
      setMapZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom() || 14;
      mapRef.current.setZoom(currentZoom - 1);
      setMapZoom(currentZoom - 1);
    }
  };

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.panTo(milanCenter);
      mapRef.current.setZoom(14);
      setMapZoom(14);
    }
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

  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-6">
          <p className="text-red-600 font-semibold mb-2">Errore nel caricamento della mappa</p>
          <p className="text-gray-600 text-sm">Verifica la connessione internet e riprova</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Caricamento mappa...</p>
        </div>
      </div>
    );
  }

  // Marker personalizzato (SVG inline come data URI) - solo dopo isLoaded
  const customMarkerIcon = {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg width="40" height="48" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C7.589 0 4 3.589 4 8c0 5.5 8 14 8 14s8-8.5 8-14c0-4.411-3.589-8-8-8z" 
              fill="#14b8a6" stroke="#0f766e" stroke-width="1.5"/>
        <circle cx="12" cy="8" r="3" fill="white"/>
      </svg>
    `),
    scaledSize: new google.maps.Size(40, 48),
    anchor: new google.maps.Point(20, 48)
  };

  // User location marker (blu)
  const userMarkerIcon = {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="8" fill="#2563eb" stroke="white" stroke-width="3"/>
      </svg>
    `),
    scaledSize: new google.maps.Size(20, 20),
    anchor: new google.maps.Point(10, 10)
  };

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

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={milanCenter}
        zoom={mapZoom}
        options={options}
        onLoad={onMapLoad}
        onZoomChanged={() => {
          if (mapRef.current) {
            setMapZoom(mapRef.current.getZoom() || 14);
          }
        }}
      >
        {/* User Location Marker */}
        <Marker
          position={userLocation}
          icon={userMarkerIcon}
          title="La tua posizione"
          zIndex={1000}
        />

        {/* Fountain Markers */}
        {filteredFountains.map((fountain) => (
          <Marker
            key={fountain.id}
            position={{ lat: fountain.lat, lng: fountain.lng }}
            icon={customMarkerIcon}
            onClick={() => handleMarkerClick(fountain)}
            title={fountain.name}
          />
        ))}

        {/* Info Window (Popup) */}
        {showPopup && (
          <InfoWindow
            position={{ lat: showPopup.lat, lng: showPopup.lng }}
            onCloseClick={() => setShowPopup(null)}
            options={{
              pixelOffset: new google.maps.Size(0, -48)
            }}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold text-gray-900 mb-2">{showPopup.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-white text-xs ${getConditionColor(showPopup.condition)}`}>
                  {showPopup.condition}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{calculateDistance(showPopup)}m</span>
                </div>
                <div className="flex items-center gap-1">
                  <Navigation className="w-4 h-4" />
                  <span>{getWalkingTime(calculateDistance(showPopup))} min</span>
                </div>
              </div>
              <button 
                onClick={handleDetailsClick}
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
              >
                Vedi Dettagli
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

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
          title="Zoom in"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
          title="Zoom out"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}