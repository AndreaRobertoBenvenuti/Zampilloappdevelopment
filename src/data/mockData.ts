import { User, FountainChat, Challenge, Reward } from '../types';

// Le fontanelle reali vengono ora caricate da src/utils/fountainDataLoader.ts
// usando il dataset ufficiale del Comune di Milano (719 fontanelle)

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    level: 12,
    points: 2450,
    totalCheckIns: 156,
    fountainsVisited: 43,
    distanceKm: 127.5,
    litersSaved: 312,
    contributions: 28
  },
  {
    id: '2',
    name: 'Alessia Bianchi',
    level: 10,
    points: 2180,
    totalCheckIns: 142,
    fountainsVisited: 38,
    distanceKm: 98.3,
    litersSaved: 284,
    contributions: 22
  },
  {
    id: '3',
    name: 'Giulia Verdi',
    level: 9,
    points: 1920,
    totalCheckIns: 128,
    fountainsVisited: 35,
    distanceKm: 86.7,
    litersSaved: 256,
    contributions: 19
  },
  {
    id: '4',
    name: 'Matteo Neri',
    level: 11,
    points: 2320,
    totalCheckIns: 148,
    fountainsVisited: 41,
    distanceKm: 156.2,
    litersSaved: 296,
    contributions: 25
  },
  {
    id: '5',
    name: 'Sofia Romano',
    level: 8,
    points: 1650,
    totalCheckIns: 98,
    fountainsVisited: 29,
    distanceKm: 67.4,
    litersSaved: 196,
    contributions: 15
  }
];

export const currentUser: User = {
  id: 'current',
  name: 'Marco',
  level: 7,
  points: 1420,
  totalCheckIns: 89,
  fountainsVisited: 24,
  distanceKm: 54.8,
  litersSaved: 178,
  contributions: 12
};

export const mockChats: FountainChat[] = [
  {
    id: '1',
    fountainId: '3',
    fountainName: 'Vedovella Parco Sempione',
    memberCount: 234,
    hasEvents: true,
    lastMessage: 'Ci vediamo domani mattina alle 8!',
    lastMessageTime: new Date(2025, 11, 19, 10, 30)
  },
  {
    id: '2',
    fountainId: '4',
    fountainName: 'Drago Verde Navigli',
    memberCount: 189,
    hasEvents: true,
    lastMessage: 'Ottima idea il picnic di sabato',
    lastMessageTime: new Date(2025, 11, 19, 9, 15)
  },
  {
    id: '3',
    fountainId: '1',
    fountainName: 'Vedovella Duomo',
    memberCount: 312,
    hasEvents: false,
    lastMessage: 'Qualcuno sa se funziona oggi?',
    lastMessageTime: new Date(2025, 11, 18, 18, 45)
  },
  {
    id: '4',
    fountainId: '2',
    fountainName: 'Drago Verde Brera',
    memberCount: 156,
    hasEvents: true,
    lastMessage: 'Tour fotografico questo weekend',
    lastMessageTime: new Date(2025, 11, 18, 14, 20)
  },
  {
    id: '5',
    fountainId: '8',
    fountainName: 'Drago Verde Isola',
    memberCount: 201,
    hasEvents: false,
    lastMessage: 'Grazie per la segnalazione!',
    lastMessageTime: new Date(2025, 11, 17, 16, 10)
  },
  {
    id: '6',
    fountainId: '5',
    fountainName: 'Vedovella Porta Venezia',
    memberCount: 178,
    hasEvents: true,
    lastMessage: 'Runner del mattino, ci siete?',
    lastMessageTime: new Date(2025, 11, 17, 7, 30)
  },
  {
    id: '7',
    fountainId: '6',
    fountainName: 'Drago Verde Città Studi',
    memberCount: 124,
    hasEvents: false,
    lastMessage: 'Studio group per gli esami?',
    lastMessageTime: new Date(2025, 11, 16, 15, 45)
  },
  {
    id: '8',
    fountainId: '7',
    fountainName: 'Vedovella Corso Buenos Aires',
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
  {
    id: '1',
    title: 'Acqua Fredda',
    description: 'Sblocca la funzione acqua refrigerata',
    requiredUses: 25,
    unlocked: true,
    icon: 'snowflake'
  },
  {
    id: '2',
    title: 'Acqua Frizzante',
    description: 'Sblocca la funzione acqua frizzante',
    requiredUses: 50,
    unlocked: true,
    icon: 'sparkles'
  },
  {
    id: '3',
    title: 'Buono BikeMi €5',
    description: 'Ricevi un buono per il bike sharing',
    requiredUses: 75,
    unlocked: false,
    icon: 'bike'
  },
  {
    id: '4',
    title: 'Buono ATM €10',
    description: 'Buono per i trasporti pubblici',
    requiredUses: 100,
    unlocked: false,
    icon: 'bus'
  },
  {
    id: '5',
    title: 'Merchandising Lamperti',
    description: 'Merchandising esclusivo Fonderie Lamperti',
    requiredUses: 200,
    unlocked: false,
    icon: 'gift'
  }
];