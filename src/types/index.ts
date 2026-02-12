export interface Fountain {
  id: string;
  name: string;
  lat: number;
  lng: number;
  condition: 'Ottima' | 'Buona' | 'Discreta';
  checkIns: number;
  contributions: number;
  description?: string;
  yearInstalled?: number;
  // Filtri avanzati
  accessibility?: 'wheelchair' | 'limited' | 'none';
  waterQuality?: 'excellent' | 'good' | 'average';
  hasPetBowl?: boolean;
}

export interface User {
  id: string;
  name: string;
  level: number;
  points: number; // Punti esperienza (XP) totali
  spendablePoints: number; // Punti spendibili per premi
  totalCheckIns: number;
  fountainsVisited: number;
  distanceKm: number;
  litersSaved: number;
  contributions: number;
  avatar?: string;
  badges?: string[]; // Array di ID badge sbloccati
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface FountainChat {
  id: string;
  fountainId: string;
  fountainName: string;
  memberCount: number;
  hasEvents: boolean;
  lastMessage?: string;
  lastMessageTime?: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'permanent' | 'consumable';
  cost?: number; // Costo in punti spendibili (solo per consumable)
  requiredLevel?: number; // Livello richiesto (solo per permanent)
  requiredUses?: number; // Utilizzi richiesti (alternativa per permanent)
  unlocked: boolean; // Se l'utente ha già sbloccato questo premio permanente
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'explorer' | 'social' | 'eco' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: string;
  unlocked: boolean;
  unlockedDate?: Date;
}

export interface FilterOptions {
  accessibility?: 'wheelchair' | 'limited' | 'none' | 'all';
  waterQuality?: 'excellent' | 'good' | 'average' | 'all';
  hasPetBowl?: boolean | null;
  condition?: 'Ottima' | 'Buona' | 'Discreta' | 'all';
}

export type EventType = 'Pulizia' | 'Passeggiata' | 'Incontro' | 'Workshop';

export interface Event {
  id: string;
  title: string;
  fountainName: string;
  district: string;
  type: EventType;
  date: string;
  time: string;
  participants: number;
  description: string;
}
