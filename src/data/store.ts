import { FountainChat, Event } from '../types';
import { mockChats, mockEvents } from './mockData';

// Inizializza lo store con i dati mock
let chats: FountainChat[] = [...mockChats];
let events: Event[] = [...mockEvents];

// Listeners per aggiornare i componenti quando i dati cambiano
const listeners: (() => void)[] = [];

export const store = {
  getChats: () => [...chats],
  
  addChat: (chat: FountainChat) => {
    chats = [chat, ...chats];
    store.notifyListeners();
  },

  getEvents: () => [...events],

  addEvent: (event: Event) => {
    // Aggiungi l'evento e ordina per data
    events = [...events, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    store.notifyListeners();
  },

  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  },

  notifyListeners: () => {
    listeners.forEach(listener => listener());
  }
};
