import { useState, useEffect } from 'react';
import { ChevronLeft, Send, Calendar, Users, CalendarPlus, ChevronDown, ChevronUp } from 'lucide-react';
import { FountainChat, ChatMessage, Event } from '../types';
import { CreateEventModal } from './CreateEventModal';
import { store } from '../data/store';

interface ChatRoomProps {
  chat: FountainChat;
  onBack: () => void;
}

export function ChatRoom({ chat, onBack }: ChatRoomProps) {
  const [message, setMessage] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  // Carica gli eventi dallo store e filtra per questa chat/fontanella
  useEffect(() => {
    const loadEvents = () => {
      const allEvents = store.getEvents();
      // Filtra gli eventi che corrispondono al nome della fontanella della chat
      const chatEvents = allEvents.filter(e => e.fountainName === chat.fountainName);
      setEvents(chatEvents);
    };

    loadEvents();
    const unsubscribe = store.subscribe(loadEvents);
    return unsubscribe;
  }, [chat.fountainName]);

  // Mock messages for demonstration
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Marco R.',
      message: 'Buongiorno! Qualcuno ha fatto un giro stamattina?',
      timestamp: new Date(2025, 11, 19, 8, 30),
      isOwn: false
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Giulia V.',
      message: 'Sì! L\'acqua è freschissima oggi 💧',
      timestamp: new Date(2025, 11, 19, 8, 45),
      isOwn: false
    },
    {
      id: '3',
      userId: 'current',
      userName: 'Tu',
      message: 'Perfetto, passo tra poco!',
      timestamp: new Date(2025, 11, 19, 9, 0),
      isOwn: true
    },
    {
      id: '4',
      userId: 'user3',
      userName: 'Matteo N.',
      message: 'Per il running group di domattina ci siete?',
      timestamp: new Date(2025, 11, 19, 9, 15),
      isOwn: false
    },
    {
      id: '5',
      userId: 'user4',
      userName: 'Alessia B.',
      message: 'Io ci sono! A che ora?',
      timestamp: new Date(2025, 11, 19, 9, 20),
      isOwn: false
    },
    {
      id: '6',
      userId: 'user3',
      userName: 'Matteo N.',
      message: 'Alle 7:30, ritrovo alla fontanella!',
      timestamp: new Date(2025, 11, 19, 9, 25),
      isOwn: false
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        userId: 'current',
        userName: 'Tu',
        message: message.trim(),
        timestamp: new Date(),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
  };

  if (showCreateEventModal) {
    return (
      <CreateEventModal
        fountainName={chat.fountainName}
        onClose={() => setShowCreateEventModal(false)}
      />
    );
  }

  return (
    <div className="h-full w-full bg-white flex flex-col relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <button 
            onClick={onBack}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="truncate font-semibold text-lg">{chat.fountainName}</h2>
            <div className="flex items-center gap-2 text-sm text-teal-100">
              <Users className="w-4 h-4" />
              <span>{chat.memberCount} membri</span>
            </div>
          </div>
            <button
                onClick={() => setShowCreateEventModal(true)}
                className="flex items-center gap-2 bg-white hover:bg-gray-100 text-black px-3 py-2 rounded-lg transition-all text-sm font-medium border border-gray-200"
                title="Crea un nuovo evento"
            >
                <CalendarPlus className="w-4 h-4" />
                <span>Crea Evento</span>
            </button>
        </div>

        {/* Events Toggle Bar - Mostra solo se ci sono eventi */}
        {events.length > 0 && (
          <button 
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full flex items-center justify-between bg-black bg-opacity-10 hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all text-sm"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Eventi in programma</span>
              <span className="bg-white text-teal-600 text-xs px-1.5 py-0.5 rounded-full font-bold">
                {events.length}
              </span>
            </div>
            {showCalendar ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Events Calendar (if shown) */}
      {showCalendar && events.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 p-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {events.map(event => (
              <div 
                key={event.id}
                className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm border border-amber-100"
              >
                <div>
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(event.date)} - {event.time}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full">
                  <Users className="w-3 h-3" />
                  {event.participants}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
              {!msg.isOwn && (
                <p className="text-xs text-gray-600 mb-1 px-1">{msg.userName}</p>
              )}
              <div className={`rounded-2xl px-4 py-2 ${
                msg.isOwn 
                  ? 'bg-teal-500 text-white rounded-br-md shadow-sm' 
                  : 'bg-white text-gray-900 rounded-bl-md shadow-sm border border-gray-100'
              }`}>
                <p>{msg.message}</p>
                <p className={`text-xs mt-1 text-right ${
                  msg.isOwn ? 'text-teal-100' : 'text-gray-400'
                }`}>
                  {formatMessageTime(msg.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 min-h-[44px] flex items-center border border-gray-200 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Scrivi un messaggio..."
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              message.trim()
                ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-lg transform hover:scale-105'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
