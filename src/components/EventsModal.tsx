import { useState } from 'react';
import { X, MapPin, Users, Filter, ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  fountainName: string;
  district: string;
  type: 'Pulizia' | 'Passeggiata' | 'Incontro' | 'Workshop';
  date: string;
  time: string;
  participants: number;
  description: string;
}

const mockEvents: Event[] = [
  // Dicembre 2025
  {
    id: '1',
    title: 'Pulizia Collettiva Vedovella Duomo',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Pulizia',
    date: '2025-12-21',
    time: '10:00',
    participants: 12,
    description: 'Uniamoci per pulire e valorizzare la storica vedovella del Duomo!'
  },
  {
    id: '2',
    title: 'Aperitivo Natalizio',
    fountainName: 'Drago Verde Navigli',
    district: 'Navigli',
    type: 'Incontro',
    date: '2025-12-21',
    time: '18:00',
    participants: 32,
    description: 'Incontro pre-natalizio della community Zampillo'
  },
  {
    id: '3',
    title: 'Tour delle Vedovelle di Brera',
    fountainName: 'Drago Verde Brera',
    district: 'Brera',
    type: 'Passeggiata',
    date: '2025-12-23',
    time: '15:00',
    participants: 24,
    description: 'Passeggiata culturale alla scoperta delle fontanelle storiche del quartiere'
  },
  {
    id: '4',
    title: 'Pulizia Post-Natale',
    fountainName: 'Vedovella Parco Sempione',
    district: 'Sempione',
    type: 'Pulizia',
    date: '2025-12-27',
    time: '10:30',
    participants: 18,
    description: 'Manteniamo pulita la vedovella del parco dopo le feste'
  },
  {
    id: '5',
    title: 'Workshop Storia Vedovelle',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Workshop',
    date: '2025-12-28',
    time: '14:00',
    participants: 15,
    description: 'Scopri la storia delle fontanelle milanesi con un esperto locale'
  },
  {
    id: '6',
    title: 'Passeggiata di Fine Anno',
    fountainName: 'Vedovella Porta Venezia',
    district: 'Porta Venezia',
    type: 'Passeggiata',
    date: '2025-12-30',
    time: '11:00',
    participants: 28,
    description: 'Tour delle vedovelle per chiudere l\'anno in bellezza'
  },
  
  // Gennaio 2026
  {
    id: '7',
    title: 'Brindisi di Capodanno',
    fountainName: 'Drago Verde Brera',
    district: 'Brera',
    type: 'Incontro',
    date: '2026-01-01',
    time: '12:00',
    participants: 45,
    description: 'Brindisi con acqua di vedovella per iniziare il nuovo anno'
  },
  {
    id: '8',
    title: 'Pulizia Inizio Anno',
    fountainName: 'Drago Verde Navigli',
    district: 'Navigli',
    type: 'Pulizia',
    date: '2026-01-04',
    time: '09:00',
    participants: 20,
    description: 'Iniziamo l\'anno prendendoci cura delle nostre vedovelle'
  },
  {
    id: '9',
    title: 'Workshop Fotografia',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Workshop',
    date: '2026-01-05',
    time: '15:30',
    participants: 16,
    description: 'Impara a fotografare le vedovelle storiche con un fotografo professionista'
  },
  {
    id: '10',
    title: 'Passeggiata Befana',
    fountainName: 'Vedovella Parco Sempione',
    district: 'Sempione',
    type: 'Passeggiata',
    date: '2026-01-06',
    time: '10:00',
    participants: 35,
    description: 'Tour speciale della Befana con sorprese per i bambini'
  },
  {
    id: '11',
    title: 'Incontro Community Gennaio',
    fountainName: 'Vedovella Porta Venezia',
    district: 'Porta Venezia',
    type: 'Incontro',
    date: '2026-01-08',
    time: '19:00',
    participants: 22,
    description: 'Pianifichiamo insieme le attività del mese'
  },
  {
    id: '12',
    title: 'Pulizia Collaborativa',
    fountainName: 'Drago Verde Brera',
    district: 'Brera',
    type: 'Pulizia',
    date: '2026-01-11',
    time: '10:00',
    participants: 25,
    description: 'Giornata di pulizia e manutenzione straordinaria'
  },
  {
    id: '13',
    title: 'Workshop Sostenibilità',
    fountainName: 'Vedovella Parco Sempione',
    district: 'Sempione',
    type: 'Workshop',
    date: '2026-01-12',
    time: '11:00',
    participants: 18,
    description: 'Scopri come ridurre l\'uso della plastica grazie alle vedovelle'
  },
  {
    id: '14',
    title: 'Aperitivo alla Vedovella',
    fountainName: 'Drago Verde Navigli',
    district: 'Navigli',
    type: 'Incontro',
    date: '2026-01-14',
    time: '18:30',
    participants: 30,
    description: 'Incontro sociale della community Zampillo ai Navigli'
  },
  {
    id: '15',
    title: 'Tour Storico Centro',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Passeggiata',
    date: '2026-01-17',
    time: '15:00',
    participants: 28,
    description: 'Alla scoperta delle vedovelle del centro storico'
  },
  {
    id: '16',
    title: 'Pulizia Weekend',
    fountainName: 'Vedovella Porta Venezia',
    district: 'Porta Venezia',
    type: 'Pulizia',
    date: '2026-01-18',
    time: '09:30',
    participants: 15,
    description: 'Pulizia del weekend per mantenere le vedovelle splendenti'
  },
  {
    id: '17',
    title: 'Workshop Idratazione',
    fountainName: 'Drago Verde Brera',
    district: 'Brera',
    type: 'Workshop',
    date: '2026-01-21',
    time: '17:00',
    participants: 20,
    description: 'L\'importanza dell\'idratazione con nutrizionisti esperti'
  },
  {
    id: '18',
    title: 'Incontro Giovani Zampillo',
    fountainName: 'Drago Verde Navigli',
    district: 'Navigli',
    type: 'Incontro',
    date: '2026-01-23',
    time: '20:00',
    participants: 40,
    description: 'Serata dedicata ai giovani della community'
  },
  {
    id: '19',
    title: 'Passeggiata Domenicale',
    fountainName: 'Vedovella Parco Sempione',
    district: 'Sempione',
    type: 'Passeggiata',
    date: '2026-01-25',
    time: '10:30',
    participants: 32,
    description: 'Tour rilassante delle vedovelle del parco'
  },
  {
    id: '20',
    title: 'Pulizia Fine Mese',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Pulizia',
    date: '2026-01-28',
    time: '09:00',
    participants: 18,
    description: 'Pulizia mensile della vedovella più iconica'
  },
  {
    id: '21',
    title: 'Workshop Arte Urbana',
    fountainName: 'Vedovella Porta Venezia',
    district: 'Porta Venezia',
    type: 'Workshop',
    date: '2026-01-30',
    time: '16:00',
    participants: 14,
    description: 'Le vedovelle come arte urbana milanese'
  },
  
  // Febbraio 2026
  {
    id: '22',
    title: 'Incontro Mensile Community',
    fountainName: 'Drago Verde Brera',
    district: 'Brera',
    type: 'Incontro',
    date: '2026-02-01',
    time: '18:00',
    participants: 35,
    description: 'Incontro mensile per pianificare le attività di febbraio'
  },
  {
    id: '23',
    title: 'Workshop Restauro Fontanelle',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Workshop',
    date: '2026-02-03',
    time: '14:00',
    participants: 18,
    description: 'Impara le tecniche di restauro delle vedovelle storiche'
  },
  {
    id: '24',
    title: 'Passeggiata Carnevale',
    fountainName: 'Drago Verde Navigli',
    district: 'Navigli',
    type: 'Passeggiata',
    date: '2026-02-05',
    time: '15:30',
    participants: 42,
    description: 'Tour in maschera delle vedovelle dei Navigli'
  },
  {
    id: '25',
    title: 'Pulizia Vedovella Navigli',
    fountainName: 'Drago Verde Navigli',
    district: 'Navigli',
    type: 'Pulizia',
    date: '2026-02-07',
    time: '10:30',
    participants: 16,
    description: 'Giornata di pulizia e manutenzione della fontanella'
  },
  {
    id: '26',
    title: 'Workshop Bambini',
    fountainName: 'Vedovella Parco Sempione',
    district: 'Sempione',
    type: 'Workshop',
    date: '2026-02-08',
    time: '11:00',
    participants: 25,
    description: 'Laboratorio educativo sull\'acqua per bambini'
  },
  {
    id: '27',
    title: 'Incontro San Valentino',
    fountainName: 'Vedovella Porta Venezia',
    district: 'Porta Venezia',
    type: 'Incontro',
    date: '2026-02-12',
    time: '19:30',
    participants: 28,
    description: 'Aperitivo pre-San Valentino alla vedovella'
  },
  {
    id: '28',
    title: 'Tour Fotografico Vedovelle',
    fountainName: 'Drago Verde Brera',
    district: 'Brera',
    type: 'Passeggiata',
    date: '2026-02-14',
    time: '10:00',
    participants: 30,
    description: 'Tour fotografico delle fontanelle storiche per San Valentino'
  },
  {
    id: '29',
    title: 'Aperitivo Sostenibile',
    fountainName: 'Vedovella Parco Sempione',
    district: 'Sempione',
    type: 'Incontro',
    date: '2026-02-14',
    time: '19:00',
    participants: 25,
    description: 'Aperitivo ecologico al parco con borracce riutilizzabili'
  },
  {
    id: '30',
    title: 'Pulizia Straordinaria',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Pulizia',
    date: '2026-02-17',
    time: '09:00',
    participants: 22,
    description: 'Pulizia straordinaria della vedovella del Duomo'
  },
  {
    id: '31',
    title: 'Workshop Idratazione e Salute',
    fountainName: 'Drago Verde Navigli',
    district: 'Navigli',
    type: 'Workshop',
    date: '2026-02-19',
    time: '15:30',
    participants: 17,
    description: 'Scopri i benefici dell\'acqua pubblica con nutrizionisti esperti'
  },
  {
    id: '32',
    title: 'Passeggiata Weekend',
    fountainName: 'Vedovella Porta Venezia',
    district: 'Porta Venezia',
    type: 'Passeggiata',
    date: '2026-02-21',
    time: '14:00',
    participants: 26,
    description: 'Tour rilassante del weekend tra le vedovelle'
  },
  {
    id: '33',
    title: 'Incontro Volontari',
    fountainName: 'Drago Verde Brera',
    district: 'Brera',
    type: 'Incontro',
    date: '2026-02-24',
    time: '18:30',
    participants: 20,
    description: 'Incontro per i volontari Zampillo più attivi'
  },
  {
    id: '34',
    title: 'Pulizia Parco Sempione',
    fountainName: 'Vedovella Parco Sempione',
    district: 'Sempione',
    type: 'Pulizia',
    date: '2026-02-26',
    time: '10:00',
    participants: 24,
    description: 'Giornata di pulizia al Parco Sempione'
  },
  {
    id: '35',
    title: 'Workshop Design Urbano',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Workshop',
    date: '2026-02-28',
    time: '16:00',
    participants: 15,
    description: 'Le vedovelle come elemento di design urbano'
  },
  
  // Marzo 2026
  {
    id: '36',
    title: 'Passeggiata Storica Milano',
    fountainName: 'Drago Verde Brera',
    district: 'Brera',
    type: 'Passeggiata',
    date: '2026-03-01',
    time: '11:00',
    participants: 35,
    description: 'Tour delle vedovelle più antiche di Milano con guida storica'
  },
  {
    id: '37',
    title: 'Incontro Primavera',
    fountainName: 'Drago Verde Navigli',
    district: 'Navigli',
    type: 'Incontro',
    date: '2026-03-03',
    time: '19:00',
    participants: 30,
    description: 'Celebriamo l\'arrivo della primavera insieme'
  },
  {
    id: '38',
    title: 'Workshop Fotografia Avanzata',
    fountainName: 'Vedovella Porta Venezia',
    district: 'Porta Venezia',
    type: 'Workshop',
    date: '2026-03-05',
    time: '15:00',
    participants: 12,
    description: 'Corso avanzato di fotografia urbana con le vedovelle'
  },
  {
    id: '39',
    title: 'Pulizia di Primavera',
    fountainName: 'Vedovella Parco Sempione',
    district: 'Sempione',
    type: 'Pulizia',
    date: '2026-03-07',
    time: '09:30',
    participants: 28,
    description: 'Grande giornata di pulizia per celebrare l\'arrivo della primavera'
  },
  {
    id: '40',
    title: 'Passeggiata Festa Donna',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Passeggiata',
    date: '2026-03-08',
    time: '10:00',
    participants: 50,
    description: 'Tour dedicato alle donne della community Zampillo'
  },
  {
    id: '41',
    title: 'Workshop Ecologia',
    fountainName: 'Drago Verde Brera',
    district: 'Brera',
    type: 'Workshop',
    date: '2026-03-10',
    time: '17:00',
    participants: 19,
    description: 'L\'impatto ecologico delle vedovelle sulla città'
  },
  {
    id: '42',
    title: 'Incontro Studenti',
    fountainName: 'Drago Verde Navigli',
    district: 'Navigli',
    type: 'Incontro',
    date: '2026-03-12',
    time: '18:00',
    participants: 45,
    description: 'Incontro dedicato agli studenti universitari'
  },
  {
    id: '43',
    title: 'Pulizia Collaborativa Centro',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Pulizia',
    date: '2026-03-14',
    time: '10:00',
    participants: 20,
    description: 'Pulizia delle vedovelle del centro storico'
  },
  {
    id: '44',
    title: 'Incontro Zampillo Kids',
    fountainName: 'Vedovella Parco Sempione',
    district: 'Sempione',
    type: 'Incontro',
    date: '2026-03-15',
    time: '15:00',
    participants: 40,
    description: 'Attività educative per bambini sull\'importanza dell\'acqua pubblica'
  },
  {
    id: '45',
    title: 'Passeggiata Naturalistica',
    fountainName: 'Vedovella Porta Venezia',
    district: 'Porta Venezia',
    type: 'Passeggiata',
    date: '2026-03-18',
    time: '14:30',
    participants: 24,
    description: 'Tour delle vedovelle con focus sulla natura urbana'
  },
  {
    id: '46',
    title: 'Workshop Arte e Vedovelle',
    fountainName: 'Drago Verde Navigli',
    district: 'Navigli',
    type: 'Workshop',
    date: '2026-03-20',
    time: '16:30',
    participants: 16,
    description: 'Laboratorio artistico ispirato alle fontanelle storiche milanesi'
  },
  {
    id: '47',
    title: 'Pulizia Weekend Brera',
    fountainName: 'Drago Verde Brera',
    district: 'Brera',
    type: 'Pulizia',
    date: '2026-03-21',
    time: '09:00',
    participants: 18,
    description: 'Pulizia del weekend a Brera'
  },
  {
    id: '48',
    title: 'Incontro Fine Mese',
    fountainName: 'Vedovella Duomo',
    district: 'Centro',
    type: 'Incontro',
    date: '2026-03-26',
    time: '19:00',
    participants: 32,
    description: 'Riunione finale del mese per la community'
  },
  {
    id: '49',
    title: 'Passeggiata Primavera',
    fountainName: 'Vedovella Parco Sempione',
    district: 'Sempione',
    type: 'Passeggiata',
    date: '2026-03-28',
    time: '11:00',
    participants: 38,
    description: 'Celebriamo la primavera con un tour nel verde'
  },
  {
    id: '50',
    title: 'Workshop Storytelling',
    fountainName: 'Vedovella Porta Venezia',
    district: 'Porta Venezia',
    type: 'Workshop',
    date: '2026-03-29',
    time: '15:30',
    participants: 14,
    description: 'Raccontare le storie delle vedovelle milanesi'
  },
];

const eventTypes = ['Tutti', 'Pulizia', 'Passeggiata', 'Incontro', 'Workshop'];
const districts = ['Tutti', 'Centro', 'Brera', 'Navigli', 'Sempione', 'Porta Venezia'];

interface EventsModalProps {
  onClose: () => void;
}

export function EventsModal({ onClose }: EventsModalProps) {
  const [selectedType, setSelectedType] = useState('Tutti');
  const [selectedDistrict, setSelectedDistrict] = useState('Tutti');
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // December 2025
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredEvents = mockEvents.filter(event => {
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