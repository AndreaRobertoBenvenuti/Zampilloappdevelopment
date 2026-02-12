import { User, FountainChat, Challenge, Reward, Badge, Event } from '../types';

// Le fontanelle reali vengono ora caricate da src/utils/fountainDataLoader.ts
// usando il dataset ufficiale del Comune di Milano (719 fontanelle)

export const currentUser: User = {
  id: '1',
  name: 'Marco Rossi',
  level: 7,
  points: 1420,
  spendablePoints: 850,
  totalCheckIns: 89,
  fountainsVisited: 24,
  distanceKm: 54.8,
  litersSaved: 178,
  contributions: 12,
  badges: ['first-drop', 'explorer-bronze', 'eco-warrior', 'social-butterfly'],
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop'
};

export const mockUsers: User[] = [
  { ...currentUser },
  {
    id: '2',
    name: 'Alessia Bianchi',
    level: 10,
    points: 2180,
    spendablePoints: 320,
    totalCheckIns: 142,
    fountainsVisited: 38,
    distanceKm: 98.3,
    litersSaved: 284,
    contributions: 22,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' // Donna
  },
  {
    id: '3',
    name: 'Giulia Verdi',
    level: 9,
    points: 1920,
    spendablePoints: 180,
    totalCheckIns: 128,
    fountainsVisited: 35,
    distanceKm: 86.7,
    litersSaved: 256,
    contributions: 19,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' // Donna
  },
  {
    id: '4',
    name: 'Matteo Grigioni',
    level: 11,
    points: 2320,
    spendablePoints: 510,
    totalCheckIns: 148,
    fountainsVisited: 41,
    distanceKm: 156.2,
    litersSaved: 296,
    contributions: 25,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' // Uomo
  },
  {
    id: '5',
    name: 'Sofia Romano',
    level: 8,
    points: 1650,
    spendablePoints: 120,
    totalCheckIns: 98,
    fountainsVisited: 29,
    distanceKm: 67.4,
    litersSaved: 196,
    contributions: 15,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' // Donna
  }
];

// currentUser è definito all'inizio del file e usato anche in mockUsers

export const mockChats: FountainChat[] = [
  {
    id: '1',
    fountainId: '3',
    fountainName: 'Runner Parco Sempione', // Modificato: Gruppo Runner
    memberCount: 234,
    hasEvents: true,
    lastMessage: 'Ci vediamo domani mattina alle 8!',
    lastMessageTime: new Date(2025, 11, 19, 10, 30)
  },
  {
    id: '2',
    fountainId: '4',
    fountainName: 'Amici dei Navigli', // Modificato: Gruppo Zona
    memberCount: 189,
    hasEvents: true,
    lastMessage: 'Ottima idea il picnic di sabato',
    lastMessageTime: new Date(2025, 11, 19, 9, 15)
  },
  {
    id: '3',
    fountainId: '1',
    fountainName: 'Vedovella Duomo', // Lasciato originale
    memberCount: 312,
    hasEvents: false,
    lastMessage: 'Qualcuno sa se funziona oggi?',
    lastMessageTime: new Date(2025, 11, 18, 18, 45)
  },
  {
    id: '4',
    fountainId: '2',
    fountainName: 'Fotografi di Brera', // Modificato: Gruppo Interesse
    memberCount: 156,
    hasEvents: true,
    lastMessage: 'Tour fotografico questo weekend',
    lastMessageTime: new Date(2025, 11, 18, 14, 20)
  },
  {
    id: '5',
    fountainId: '8',
    fountainName: 'Drago Verde Isola', // Lasciato originale
    memberCount: 201,
    hasEvents: false,
    lastMessage: 'Grazie per la segnalazione!',
    lastMessageTime: new Date(2025, 11, 17, 16, 10)
  },
  {
    id: '6',
    fountainId: '5',
    fountainName: 'Porta Venezia Active', // Modificato: Gruppo Attivo
    memberCount: 178,
    hasEvents: true,
    lastMessage: 'Runner del mattino, ci siete?',
    lastMessageTime: new Date(2025, 11, 17, 7, 30)
  },
  {
    id: '7',
    fountainId: '6',
    fountainName: 'Studenti Città Studi', // Modificato: Gruppo Studenti
    memberCount: 124,
    hasEvents: false,
    lastMessage: 'Studio group per gli esami?',
    lastMessageTime: new Date(2025, 11, 16, 15, 45)
  },
  {
    id: '8',
    fountainId: '7',
    fountainName: 'Vedovella Corso Buenos Aires', // Lasciato originale
    memberCount: 95,
    hasEvents: true,
    lastMessage: 'Pulizia prevista per sabato',
    lastMessageTime: new Date(2025, 11, 15, 12, 20)
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Esploratore Settimanale',
    description: 'Visita 5 vedovelle diverse questa settimana',
    progress: 3,
    target: 5,
    reward: 'Badge Esploratore + 100 punti'
  },
  {
    id: '2',
    title: 'Il Percorso delle Stelle',
    description: 'Traccia un percorso che forma una stella sulla mappa',
    progress: 0,
    target: 1,
    reward: 'Badge Stella + 250 punti'
  },
  {
    id: '3',
    title: 'Archeologo Urbano',
    description: 'Scopri le 3 vedovelle più antiche di Milano',
    progress: 1,
    target: 3,
    reward: 'Badge Storico + 150 punti'
  }
];

export const mockRewards: Reward[] = [
  // Premi Permanenti (Sbloccabili con Livello/Utilizzi)
  {
    id: '1',
    title: 'Statistiche Avanzate',
    description: 'Grafici dettagliati e analisi dei consumi e risparmi',
    type: 'permanent',
    requiredUses: 25,
    requiredLevel: 3,
    unlocked: true,
    icon: 'snowflake'
  },
  {
    id: '2',
    title: 'Percorsi Idratazione',
    description: 'Crea percorsi a piedi che passano per più fontanelle',
    type: 'permanent',
    requiredUses: 50,
    requiredLevel: 5,
    unlocked: true,
    icon: 'sparkles'
  },
  
  // Premi Consumabili (Acquistabili con Punti)
  {
    id: '3',
    title: 'Buono BikeMi €5',
    description: 'Ricevi un buono per il bike sharing',
    type: 'consumable',
    cost: 500,
    requiredUses: 0,
    unlocked: false,
    icon: 'bike'
  },
  {
    id: '4',
    title: 'Buono ATM €10',
    description: 'Buono per i trasporti pubblici',
    type: 'consumable',
    cost: 900,
    requiredUses: 0,
    unlocked: false,
    icon: 'bus'
  },
  {
    id: '5',
    title: 'Merchandising Lamperti',
    description: 'Merchandising esclusivo Fonderie Lamperti',
    type: 'consumable',
    cost: 2500,
    requiredUses: 0,
    unlocked: false,
    icon: 'gift'
  }
];

export const mockBadges: Badge[] = [
  // Explorer Badges
  {
    id: 'first-drop',
    name: 'Prima Goccia',
    description: 'Completa il tuo primo check-in',
    icon: '💧',
    category: 'explorer',
    rarity: 'common',
    requirement: '1 check-in',
    unlocked: true,
    unlockedDate: new Date(2025, 10, 15)
  },
  {
    id: 'explorer-bronze',
    name: 'Esploratore Bronze',
    description: 'Visita 10 fontanelle diverse',
    icon: '🥉',
    category: 'explorer',
    rarity: 'common',
    requirement: '10 fontanelle',
    unlocked: true,
    unlockedDate: new Date(2025, 11, 1)
  },
  {
    id: 'explorer-silver',
    name: 'Esploratore Silver',
    description: 'Visita 25 fontanelle diverse',
    icon: '🥈',
    category: 'explorer',
    rarity: 'rare',
    requirement: '25 fontanelle',
    unlocked: false
  },
  {
    id: 'explorer-gold',
    name: 'Esploratore Gold',
    description: 'Visita 50 fontanelle diverse',
    icon: '🥇',
    category: 'explorer',
    rarity: 'epic',
    requirement: '50 fontanelle',
    unlocked: false
  },
  {
    id: 'milan-master',
    name: 'Maestro di Milano',
    description: 'Visita tutte le fontanelle di Milano',
    icon: '👑',
    category: 'explorer',
    rarity: 'legendary',
    requirement: '719 fontanelle',
    unlocked: false
  },

  // Social Badges
  {
    id: 'social-butterfly',
    name: 'Farfalla Sociale',
    description: 'Partecipa a 5 chat community',
    icon: '🦋',
    category: 'social',
    rarity: 'common',
    requirement: '5 chat',
    unlocked: true,
    unlockedDate: new Date(2025, 11, 10)
  },
  {
    id: 'helpful-hand',
    name: 'Mano Solidale',
    description: 'Aiuta la community con 10 segnalazioni',
    icon: '🤝',
    category: 'social',
    rarity: 'rare',
    requirement: '10 segnalazioni',
    unlocked: false
  },
  {
    id: 'community-leader',
    name: 'Leader Community',
    description: 'Diventa il più attivo in 3 fontanelle',
    icon: '⭐',
    category: 'social',
    rarity: 'epic',
    requirement: 'Top contributor',
    unlocked: false
  },

  // Eco Badges
  {
    id: 'eco-warrior',
    name: 'Guerriero Eco',
    description: 'Risparmia 100 litri di plastica',
    icon: '♻️',
    category: 'eco',
    rarity: 'common',
    requirement: '100 litri',
    unlocked: true,
    unlockedDate: new Date(2025, 11, 5)
  },
  {
    id: 'planet-saver',
    name: 'Salvatore del Pianeta',
    description: 'Risparmia 500 litri di plastica',
    icon: '🌍',
    category: 'eco',
    rarity: 'rare',
    requirement: '500 litri',
    unlocked: false
  },
  {
    id: 'green-hero',
    name: 'Eroe Verde',
    description: 'Risparmia 1000 litri di plastica',
    icon: '🌱',
    category: 'eco',
    rarity: 'epic',
    requirement: '1000 litri',
    unlocked: false
  },

  // Special Badges
  {
    id: 'night-owl',
    name: 'Gufo Notturno',
    description: 'Fai check-in tra mezzanotte e le 6 del mattino',
    icon: '🦉',
    category: 'special',
    rarity: 'rare',
    requirement: 'Check-in notturno',
    unlocked: false
  },
  {
    id: 'weather-warrior',
    name: 'Guerriero del Tempo',
    description: 'Visita fontanelle con pioggia o neve',
    icon: '⛈️',
    category: 'special',
    rarity: 'rare',
    requirement: 'Check-in con maltempo',
    unlocked: false
  },
  {
    id: 'photo-pro',
    name: 'Fotografo Pro',
    description: 'Condividi 50 foto di fontanelle',
    icon: '📸',
    category: 'special',
    rarity: 'epic',
    requirement: '50 foto',
    unlocked: false
  },
  {
    id: 'history-buff',
    name: 'Appassionato di Storia',
    description: 'Visita tutte le fontanelle storiche',
    icon: '📜',
    category: 'special',
    rarity: 'legendary',
    requirement: 'Fontanelle storiche',
    unlocked: false
  }
];

export const mockEvents: Event[] = [
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
