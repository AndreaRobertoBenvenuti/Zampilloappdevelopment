import { useState } from 'react';
import { ChevronLeft, Send, Calendar, Users, Plus } from 'lucide-react';
import { FountainChat, ChatMessage } from '../types';
import { CreateEventModal } from './CreateEventModal';

interface ChatRoomProps {
  chat: FountainChat;
  onBack: () => void;
}

export function ChatRoom({ chat, onBack }: ChatRoomProps) {
  const [message, setMessage] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

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

  // Mock events data
  const upcomingEvents = [
    { id: '1', title: 'Running Group', date: '20 Dic, 7:30', participants: 12 },
    { id: '2', title: 'Picnic Community', date: '22 Dic, 12:00', participants: 23 },
    { id: '3', title: 'Tour Fotografico', date: '24 Dic, 15:00', participants: 8 }
  ];

  return (
    <div className="h-full w-full bg-white flex flex-col relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <button 
            onClick={onBack}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="truncate">{chat.fountainName}</h2>
            <div className="flex items-center gap-3 text-sm text-teal-100 mt-1">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {chat.memberCount} membri
              </span>
              {chat.hasEvents && (
                <button 
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Eventi
                </button>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowCreateEventModal(true)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            title="Crea Evento"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Events Calendar (if shown) */}
      {showCalendar && (
        <div className="bg-amber-50 border-b border-amber-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-amber-600" />
            <h3 className="font-medium text-amber-900">Eventi Programmati</h3>
          </div>
          <div className="space-y-2">
            {upcomingEvents.map(event => (
              <div 
                key={event.id}
                className="bg-white rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
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
                  ? 'bg-teal-500 text-white rounded-br-md' 
                  : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
              }`}>
                <p>{msg.message}</p>
                <p className={`text-xs mt-1 ${
                  msg.isOwn ? 'text-teal-100' : 'text-gray-500'
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
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 min-h-[44px] flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Scrivi un messaggio..."
              className="flex-1 bg-transparent outline-none"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              message.trim()
                ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-lg' 
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateEventModal && (
        <CreateEventModal
          fountainName={chat.fountainName}
          onClose={() => setShowCreateEventModal(false)}
        />
      )}
    </div>
  );
}
