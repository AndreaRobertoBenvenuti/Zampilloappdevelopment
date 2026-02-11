import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  Search,
  MapPin,
  Navigation,
  X,
  QrCode,
  Locate,
  ExternalLink,
  Filter,
  Heart,
  ArrowUpDown,
  Flame,
  SlidersHorizontal,
} from "lucide-react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { loadMilanFountains } from "../utils/fountainDataLoader";
import { Fountain, FilterOptions } from "../types";
import { FountainDetailView } from "./FountainDetailView";
import { FilterPanel } from "./FilterPanel";
import { useFavorites } from "../hooks/useFavorites";

const GOOGLE_MAPS_API_KEY = "AIzaSyARUY0tCHG2jJBP0nHuHKL1REFDd0he-gg";

// Librerie Google Maps - DEVE essere una costante fuori dal componente
const libraries: "places"[] = ["places"];

// Centro Milano (Piazza Duomo)
const milanCenter = {
  lat: 45.4642,
  lng: 9.19,
};

// Stile custom della mappa (verde acqua per abbinarsi al tema)
const mapStyles = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#a2dcd7" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#d4edda" }],
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  gestureHandling: "greedy" as const,
};

export function MapView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFountain, setSelectedFountain] = useState<Fountain | null>(
    null
  );
  const [showPopup, setShowPopup] = useState<Fountain | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [userLocation] = useState(milanCenter);
  const [mapZoom, setMapZoom] = useState(14);
  const [fountains, setFountains] = useState<Fountain[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    accessibility: "all",
    waterQuality: "all",
    hasPetBowl: null,
    isRefrigerated: null,
    condition: "all",
  });
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null); // in metri
  const [sortBy, setSortBy] = useState<
    "distance" | "quality" | "popular" | "none"
  >("none");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const calculateDistance = (fountain: Fountain) => {
    const R = 6371;
    const dLat = ((fountain.lat - userLocation.lat) * Math.PI) / 180;
    const dLng = ((fountain.lng - userLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((fountain.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000;
    return Math.round(distance);
  };

  const getWalkingTime = (distanceMeters: number) => {
    const walkingSpeedKmH = 5;
    const timeMinutes = (distanceMeters / 1000 / walkingSpeedKmH) * 60;
    return Math.round(timeMinutes);
  };

  const handleNavigate = (fountain: Fountain) => {
    // Apre Google Maps con navigazione verso la fontanella
    const url = `https://www.google.com/maps/dir/?api=1&destination=${fountain.lat},${fountain.lng}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    setFountains(loadMilanFountains());
  }, []);

  // Funzione per applicare i filtri avanzati
  const applyFilters = (fountain: Fountain): boolean => {
    // Filtro nome (ricerca)
    if (!fountain.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filtro solo preferite
    if (showOnlyFavorites && !isFavorite(fountain.id)) {
      return false;
    }

    // Filtro distanza
    if (distanceFilter !== null) {
      const distance = calculateDistance(fountain);
      if (distance > distanceFilter) {
        return false;
      }
    }

    // Filtro accessibilità
    if (filters.accessibility && filters.accessibility !== "all") {
      if (fountain.accessibility !== filters.accessibility) {
        return false;
      }
    }

    // Filtro qualità acqua
    if (filters.waterQuality && filters.waterQuality !== "all") {
      if (fountain.waterQuality !== filters.waterQuality) {
        return false;
      }
    }

    // Filtro condizione
    if (filters.condition && filters.condition !== "all") {
      if (fountain.condition !== filters.condition) {
        return false;
      }
    }

    // Filtro ciotola animali
    if (filters.hasPetBowl === true) {
      if (!fountain.hasPetBowl) {
        return false;
      }
    }

    // Filtro acqua refrigerata
    if (filters.isRefrigerated === true) {
      if (!fountain.isRefrigerated) {
        return false;
      }
    }

    return true;
  };

  // Funzione per ottenere il punteggio qualità
  const getQualityScore = (fountain: Fountain): number => {
    const qualityScores = { excellent: 3, good: 2, average: 1 };
    return qualityScores[fountain.waterQuality || "average"] || 0;
  };

  // Applica filtri e ordinamento
  let filteredFountains = fountains.filter(applyFilters);

  // Ordinamento e filtro "Popolari" (Top 30)
  if (sortBy !== "none") {
    filteredFountains = [...filteredFountains].sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return calculateDistance(a) - calculateDistance(b);
        case "quality":
          return getQualityScore(b) - getQualityScore(a);
        case "popular":
          return b.checkIns - a.checkIns;
        default:
          return 0;
      }
    });

    // Se è attivo il filtro "Popolari", prendi solo le prime 30
    if (sortBy === "popular") {
      filteredFountains = filteredFountains.slice(0, 30);
    }
  }

  // Conta i filtri attivi
  const activeFiltersCount = [
    filters.accessibility !== "all" && filters.accessibility !== undefined,
    filters.waterQuality !== "all" && filters.waterQuality !== undefined,
    filters.hasPetBowl !== null,
    filters.isRefrigerated !== null,
    filters.condition !== "all" && filters.condition !== undefined,
  ].filter(Boolean).length;

  const handleMarkerClick = (fountain: Fountain) => {
    setShowPopup(fountain);
    // Centra la mappa sul marker cliccato, spostandola un po' verso l'alto per non essere coperta dalla bottom sheet
    if (mapRef.current) {
      const offsetLat = fountain.lat + 0.002; // Sposta leggermente verso l'alto
      mapRef.current.panTo({ lat: offsetLat, lng: fountain.lng });
    }
  };

  const handleDetailsClick = () => {
    setSelectedFountain(showPopup);
    setShowDetailModal(true);
    setShowPopup(null);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Ottima":
        return "bg-green-500";
      case "Buona":
        return "bg-blue-500";
      case "Discreta":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleQRScan = () => {
    alert(
      "Fotocamera QR Code: Inquadra il codice QR su una vedovella per accedere rapidamente alle sue informazioni!"
    );
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
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    );
  }

  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-6">
          <p className="text-red-600 font-semibold mb-2">
            Errore nel caricamento della mappa
          </p>
          <p className="text-gray-600 text-sm">
            Verifica la connessione internet e riprova
          </p>
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
    url:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(`
      <svg width="40" height="48" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C7.589 0 4 3.589 4 8c0 5.5 8 14 8 14s8-8.5 8-14c0-4.411-3.589-8-8-8z"
              fill="#14b8a6" stroke="#0f766e" stroke-width="1.5"/>
        <circle cx="12" cy="8" r="3" fill="white"/>
      </svg>
    `),
    scaledSize: new google.maps.Size(40, 48),
    anchor: new google.maps.Point(20, 48),
  };

  // User location marker (blu)
  const userMarkerIcon = {
    url:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(`
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="8" fill="#2563eb" stroke="white" stroke-width="3"/>
      </svg>
    `),
    scaledSize: new google.maps.Size(20, 20),
    anchor: new google.maps.Point(10, 10),
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
              onClick={() => setSearchQuery("")}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Filtri rapidi e ordinamento */}
        <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
          {/* Filtro Distanza */}
          <div className="flex gap-1 bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() => setDistanceFilter(null)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                distanceFilter === null
                  ? "bg-teal-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Tutte
            </button>
            <button
              onClick={() => setDistanceFilter(500)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                distanceFilter === 500
                  ? "bg-teal-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              500m
            </button>
            <button
              onClick={() => setDistanceFilter(1000)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                distanceFilter === 1000
                  ? "bg-teal-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              1km
            </button>
          </div>

          {/* Ordinamento e Filtri */}
          <div className="flex gap-1 bg-white rounded-lg shadow-lg p-1">
            <button
              onClick={() =>
                setSortBy(sortBy === "popular" ? "none" : "popular")
              }
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex flex-col items-center gap-0.5 min-w-[60px] ${
                sortBy === "popular"
                  ? "bg-teal-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">🔥</span>
              <span>Popolari</span>
            </button>

            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex flex-col items-center gap-0.5 min-w-[60px] ${
                showOnlyFavorites
                  ? "bg-teal-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">❤️</span>
              <span>Preferiti</span>
            </button>

            <button
              onClick={() => setShowFilterPanel(true)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex flex-col items-center gap-0.5 min-w-[60px] relative ${
                activeFiltersCount > 0
                  ? "bg-teal-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <SlidersHorizontal className={`w-5 h-5 ${activeFiltersCount > 0 ? "text-white" : "text-teal-600"}`} />
              <span>Filtri</span>
              {activeFiltersCount > 0 && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Scanner*/}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleQRScan}
          className="bg-white rounded-lg p-3 hover:bg-gray-50 transition-colors"
          title="Scansiona QR Code"
        >
          <QrCode className="w-6 h-6 text-teal-600" />
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
      </GoogleMap>

      {/* Map Controls */}
      <div className="fixed right-4 bottom-32 z-10 flex flex-col gap-2">
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
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
          title="Zoom out"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Sheet Preview - Appare sopra la navigation bar */}
      {showPopup && (
        <div className="fixed bottom-20 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="bg-white mx-4 rounded-2xl shadow-2xl p-4">
            {/* Header con cuore e X */}
            <div className="flex items-center justify-between mb-3">
              {/* Maniglia per swipe */}
              <div className="flex-1 flex justify-center">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>
              {/* Bottoni azioni */}
              <div className="flex gap-1">
                <button
                  onClick={() => toggleFavorite(showPopup.id)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title={
                    isFavorite(showPopup.id)
                      ? "Rimuovi dai preferiti"
                      : "Aggiungi ai preferiti"
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(showPopup.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-500"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setShowPopup(null)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Contenuto */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {showPopup.name}
              </h3>

              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getConditionColor(
                    showPopup.condition
                  )}`}
                >
                  {showPopup.condition}
                </span>
                {showPopup.accessibility === "wheelchair" && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                    ♿ Accessibile
                  </span>
                )}
                {showPopup.isRefrigerated && (
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium flex items-center gap-1">
                    ❄️ Refrigerata
                  </span>
                )}
                {showPopup.hasPetBowl && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex items-center gap-1">
                    🐕 Pet-friendly
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{calculateDistance(showPopup)}m</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-4 h-4" />
                  <span>
                    {getWalkingTime(calculateDistance(showPopup))} min
                  </span>
                </div>
              </div>
            </div>

            {/* Bottoni azioni */}
            <div className="flex gap-3">
              <button
                onClick={() => handleNavigate(showPopup)}
                className="flex-1 bg-white border-2 border-teal-600 text-teal-600 py-3 px-4 rounded-lg hover:bg-teal-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Indicazioni
              </button>
              <button
                onClick={handleDetailsClick}
                className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Vedi Dettagli
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
}
