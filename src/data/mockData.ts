import { User, FountainChat, Challenge, Reward, Badge } from '../types';

// Le fontanelle reali vengono ora caricate da src/utils/fountainDataLoader.ts
// usando il dataset ufficiale del Comune di Milano (719 fontanelle)

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    level: 12,
    points: 2450,
    spendablePoints: 450,
    totalCheckIns: 156,
    fountainsVisited: 43,
    distanceKm: 127.5,
    litersSaved: 312,
    contributions: 28,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' // Uomo
  },
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

export const currentUser: User = {
  id: 'current',
  name: 'Marco',
  level: 7,
  points: 1420,
  spendablePoints: 850, // Punti disponibili per acquisti
  totalCheckIns: 89,
  fountainsVisited: 24,
  distanceKm: 54.8,
  litersSaved: 178,
  contributions: 12,
  badges: ['first-drop', 'explorer-bronze', 'eco-warrior', 'social-butterfly'],
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop' // Uomo (Utente corrente)
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
  // Premi Permanenti (Sbloccabili con Livello/Utilizzi)
  {
    id: '1',
    title: 'Acqua Fredda',
    description: 'Sblocca la funzione acqua refrigerata',
    type: 'permanent',
    requiredUses: 25,
    requiredLevel: 3,
    unlocked: true,
    icon: 'snowflake'
  },
  {
    id: '2',
    title: 'Acqua Frizzante',
    description: 'Sblocca la funzione acqua frizzante',
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
    name: 'Sentinella',
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