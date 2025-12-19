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
}

export interface User {
  id: string;
  name: string;
  level: number;
  points: number;
  totalCheckIns: number;
  fountainsVisited: number;
  distanceKm: number;
  litersSaved: number;
  contributions: number;
  avatar?: string;
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
  requiredUses: number;
  unlocked: boolean;
  icon: string;
}
