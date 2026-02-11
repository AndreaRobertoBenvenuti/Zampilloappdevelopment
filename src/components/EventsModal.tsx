import { useState, useEffect } from 'react';
import { X, MapPin, Users, Filter, ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Event, EventType } from '../types';
import { store } from '../data/store';

const eventTypes: EventType[] = ['Pulizia', 'Passeggiata', 'Incontro', 'Workshop'];
const districts = ['Tutti', 'Centro', 'Brera', 'Navigli', 'Sempione', 'Porta Venezia'];

interface EventsModalProps {
  onClose: () => void;
}

export function EventsModal({ onClose }: EventsModalProps) {
  const [selectedType, setSelectedType] = useState<EventType | 'Tutti'>('Tutti');
  const [selectedDistrict, setSelectedDistrict] = useState('Tutti');
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // December 2025
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>(store.getEvents());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setEvents(store.getEvents());
    });
    return unsubscribe;
  }, []);

  const filteredEvents = events.filter(event => {
    const typeMatch = selectedType === 'Tutti' || event.type === selectedType;
    const districtMatch = selectedDistrict === 'Tutti' || event.district === selectedDistrict;
    return typeMatch && districtMatch;
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Pulizia': return 'bg-green-100 text-green-700';
      case 'Passeggiata': return 'bg-blue-100 text-blue-700';
      case 'Incontro': return 'bg-purple-100 text-purple-700';
      case 'Workshop': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days: (number | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const hasEventsOnDate = (day: number | null) => {
    if (!day) return false;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.some(event => event.date === dateStr);
  };

  const getEventsCountOnDate = (day: number | null) => {
    if (!day) return 0;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter(event => event.date === dateStr).length;
  };

  const handleDateClick = (day: number | null) => {
    if (!day) return;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (hasEventsOnDate(day)) {
      setSelectedDate(selectedDate === dateStr ? null : dateStr);
    }
  };

  const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

  // Eventi da mostrare nella lista: o filtrati per data selezionata, o tutti
  const displayEvents = selectedDate 
    ? filteredEvents.filter(event => event.date === selectedDate)
    : filteredEvents;

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            <h1>Eventi Vedovelle</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-teal-50 text-sm">
          {selectedDate 
            ? `${displayEvents.length} ${displayEvents.length === 1 ? 'evento' : 'eventi'} per ${formatDate(selectedDate)}`
            : `${filteredEvents.length} eventi in programma`
          }
        </p>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <button
                onClick={() => {
                  setShowTypeFilter(!showTypeFilter);
                  setShowDistrictFilter(false);
                }}
                className="w-full flex items-center justify-between gap-2 bg-gray-100 rounded-lg px-3 py-2 hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{selectedType}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showTypeFilter && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
                  <button
                    onClick={() => {
                      setSelectedType('Tutti');
                      setShowTypeFilter(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                      selectedType === 'Tutti' ? 'bg-teal-50 text-teal-700' : 'text-gray-700'
                    }`}
                  >
                    Tutti
                  </button>
                  {eventTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setShowTypeFilter(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        selectedType === type ? 'bg-teal-50 text-teal-700' : 'text-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 relative">
              <button
                onClick={() => {
                  setShowDistrictFilter(!showDistrictFilter);
                  setShowTypeFilter(false);
                }}
                className="w-full flex items-center justify-between gap-2 bg-gray-100 rounded-lg px-3 py-2 hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{selectedDistrict}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showDistrictFilter && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
                  {districts.map(district => (
                    <button
                      key={district}
                      onClick={() => {
                        setSelectedDistrict(district);
                        setShowDistrictFilter(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        selectedDistrict === district ? 'bg-teal-50 text-teal-700' : 'text-gray-700'
                      }`}
                    >
                      {district}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="font-medium text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Names */}
            {dayNames.map(dayName => (
              <div key={dayName} className="text-xs text-gray-500 font-medium text-center py-2">
                {dayName}
              </div>
            ))}

            {/* Days */}
            {getDaysInMonth(currentMonth).map((day, index) => {
              const dateStr = day ? `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
              const eventsCount = getEventsCountOnDate(day);
              const hasEvents = hasEventsOnDate(day);
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  disabled={!day || !hasEvents}
                  className={`
                    aspect-square relative flex flex-col items-center justify-center rounded-lg text-sm
                    ${!day ? 'invisible' : ''}
                    ${isSelected ? 'bg-teal-600 text-white' : hasEvents ? 'bg-teal-100 hover:bg-teal-200 cursor-pointer' : 'text-gray-400 cursor-default'}
                    ${day && !hasEvents ? 'hover:bg-gray-100' : ''}
                    transition-colors
                  `}
                >
                  <span className="font-medium">{day}</span>
                  {eventsCount > 0 && !isSelected && (
                    <span className="absolute bottom-1 w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                      {eventsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              {selectedDate 
                ? 'Clicca di nuovo sulla data per deselezionare'
                : 'Clicca su una data evidenziata per filtrare gli eventi'
              }
            </p>
          </div>
        </div>

        {/* Events List */}
        <div className="p-4">
          <h2 className="font-medium text-gray-900 mb-4">
            {selectedDate ? `Eventi del ${formatDate(selectedDate)}` : 'Tutti gli eventi'}
          </h2>
          
          {displayEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mb-3" />
              <h3 className="font-medium text-gray-900 mb-1">Nessun evento trovato</h3>
              <p className="text-sm text-gray-600">
                {selectedDate ? 'Non ci sono eventi in questa data' : 'Prova a modificare i filtri di ricerca'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayEvents.map(event => (
                <div 
                  key={event.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.fountainName}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-teal-600">
                      <Users className="w-4 h-4" />
                      <span>{event.participants}</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm">
                    Partecipa
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}