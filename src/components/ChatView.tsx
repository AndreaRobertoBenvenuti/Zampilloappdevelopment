import { useState, useEffect } from 'react';
import { MessageSquare, Calendar, Users, Plus, Filter, ChevronDown, UserPlus, X } from 'lucide-react';
import { FountainChat } from '../types';
import { store } from '../data/store';
import { ChatRoom } from './ChatRoom';
import { CreateChatModal } from './CreateChatModal';
import { EventsModal } from './EventsModal';

// Chat a cui l'utente è già unito (gestito con state)
const initialJoinedChatIds = ['1', '2', '3'];

const districts = ['Tutti', 'Centro', 'Brera', 'Navigli', 'Sempione', 'Porta Venezia', 'Città Studi', 'Isola'];
const chatTypes = ['Tutte', 'Con Eventi', 'Attive'];

interface ChatViewProps {
  initialParams?: { district?: string };
}

export function ChatView({ initialParams }: ChatViewProps) {
  const [selectedChat, setSelectedChat] = useState<FountainChat | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('Tutti');
  const [selectedType, setSelectedType] = useState('Tutte');
  const [showDistrictFilter, setShowDistrictFilter] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [joinedChatIds, setJoinedChatIds] = useState<string[]>(initialJoinedChatIds);
  const [showJoinDialog, setShowJoinDialog] = useState<FountainChat | null>(null);
  const [chats, setChats] = useState<FountainChat[]>(store.getChats());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setChats(store.getChats());
    });
    return unsubscribe;
  }, []);

  // Imposta il filtro iniziale se passato tramite props
  useEffect(() => {
    if (initialParams?.district && districts.includes(initialParams.district)) {
      setSelectedDistrict(initialParams.district);
    }
  }, [initialParams]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Ora';
    if (hours < 24) return `${hours}h fa`;
    return `${Math.floor(hours / 24)}g fa`;
  };

  // Separare chat unite e disponibili
  const joinedChats = chats.filter(chat => joinedChatIds.includes(chat.id));
  const availableChats = chats.filter(chat => !joinedChatIds.includes(chat.id));

  // Controlla dinamicamente se una chat ha eventi associati
  const allEvents = store.getEvents();
  const chatHasEvents = (chat: FountainChat): boolean => {
    return allEvents.some(e => e.fountainName === chat.fountainName);
  };

  // Funzione per ottenere il quartiere dalla fontana
  const getFountainDistrict = (fountainName: string): string => {
    const text = fountainName.toLowerCase();

    const districtKeywords: [string, string[]][] = [
      ['Centro', ['duomo', 'guastalla', 'vetra', 'centro storico', 'magenta', 's. vittore', 'vigentina', 'lodovica', 'pta romana']],
      ['Brera', ['brera', 'sarpi', 'garibaldi', 'porta nuova']],
      ['Navigli', ['navigli', 'naviglio', 'conca del naviglio', 'conchetta', 'porta genova', 'tortona', 'solari']],
      ['Sempione', ['sempione', 'portello', 'de angeli', 'monte rosa', 'pagano', 'tre torri', 'fiera']],
      ['Porta Venezia', ['porta venezia', 'buenos aires', 'porta monforte', 'loreto', 'casoretto', 'nolo', 'corsica', 'giardini p.ta venezia']],
      ['Città Studi', ['città studi', 'citta studi', 'lambrate', 'ortica']],
      ['Isola', ['isola', 'farini', 'maciachini', 'maggiolina']],
    ];

    for (const [district, keywords] of districtKeywords) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          return district;
        }
      }
    }

    return 'Centro';
  };

  // Filtra chat disponibili
  const filteredAvailableChats = availableChats.filter(chat => {
    const districtMatch = selectedDistrict === 'Tutti' || getFountainDistrict(chat.fountainName) === selectedDistrict;
    const typeMatch = selectedType === 'Tutte' || 
                     (selectedType === 'Con Eventi' && chatHasEvents(chat)) ||
                     (selectedType === 'Attive' && chat.lastMessageTime);
    return districtMatch && typeMatch;
  });

  // Filtra anche le chat unite in base ai filtri (richiesta utente)
  const filteredJoinedChats = joinedChats.filter(chat => {
    const districtMatch = selectedDistrict === 'Tutti' || getFountainDistrict(chat.fountainName) === selectedDistrict;
    const typeMatch = selectedType === 'Tutte' || 
                     (selectedType === 'Con Eventi' && chatHasEvents(chat)) ||
                     (selectedType === 'Attive' && chat.lastMessageTime);
    return districtMatch && typeMatch;
  });

  // Gestione unione alla chat
  const handleJoinChat = () => {
    if (showJoinDialog) {
      setJoinedChatIds([...joinedChatIds, showJoinDialog.id]);
      setShowJoinDialog(null);
    }
  };

  const handleChatCreated = (chatId: string) => {
    setJoinedChatIds(prev => [chatId, ...prev]);
    setShowCreateModal(false);
  };

  if (selectedChat) {
    return <ChatRoom chat={selectedChat} onBack={() => setSelectedChat(null)} />;
  }

  if (showEventsModal) {
    return <EventsModal onClose={() => setShowEventsModal(false)} />;
  }

  if (showCreateModal) {
    return (
      <CreateChatModal 
        onClose={() => setShowCreateModal(false)} 
        onChatCreated={handleChatCreated}
      />
    );
  }

  // Render item per chat a cui sei già unito
  const renderJoinedChatItem = (chat: FountainChat) => (
    <button
      key={chat.id}
      onClick={() => setSelectedChat(chat)}
      className="w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left"
    >
      <div className="flex items-start gap-3">
        {/* Fountain Icon */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center text-white flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 2C12 2 8 4 8 8C8 12 12 14 12 14C12 14 16 12 16 8C16 4 12 2 12 2Z" />
            <path d="M12 14C12 14 8 16 8 20C8 22 10 22 12 22C14 22 16 22 16 20C16 16 12 14 12 14Z" />
          </svg>
        </div>

        {/* Chat Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-medium text-gray-900 truncate">{chat.fountainName}</h3>
            {chat.lastMessageTime && (
              <span className="text-xs text-gray-500 flex-shrink-0">
                {formatTime(chat.lastMessageTime)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              {chat.memberCount} membri
            </span>
            {chatHasEvents(chat) && (
              <span className="flex items-center gap-1 text-sm text-teal-600">
                <Calendar className="w-4 h-4" />
                Eventi
              </span>
            )}
          </div>

          {chat.lastMessage && (
            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
          )}
        </div>
      </div>
    </button>
  );

  // Render item per chat disponibili (senza messaggio)
  const renderAvailableChatItem = (chat: FountainChat) => (
    <button
      key={chat.id}
      onClick={() => setShowJoinDialog(chat)}
      className="w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left"
    >
      <div className="flex items-start gap-3">
        {/* Fountain Icon */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center text-white flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 2C12 2 8 4 8 8C8 12 12 14 12 14C12 14 16 12 16 8C16 4 12 2 12 2Z" />
            <path d="M12 14C12 14 8 16 8 20C8 22 10 22 12 22C14 22 16 22 16 20C16 16 12 14 12 14Z" />
          </svg>
        </div>

        {/* Chat Info - NO lastMessage */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-medium text-gray-900 truncate">{chat.fountainName}</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              {chat.memberCount} membri
            </span>
            {chatHasEvents(chat) && (
              <span className="flex items-center gap-1 text-sm text-teal-600">
                <Calendar className="w-4 h-4" />
                Eventi
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <div className="h-full w-full bg-white flex flex-col relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            <h1>Chat Vedovelle</h1>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <p className="text-teal-50 text-sm">
          Connettiti con la community delle fontanelle
        </p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Filters - Spostati in alto per applicarsi a tutto */}
        <div className="p-4 bg-gray-50 sticky top-0 z-10 border-b border-gray-200">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <button
                onClick={() => {
                  setShowDistrictFilter(!showDistrictFilter);
                  setShowTypeFilter(false);
                }}
                className="w-full flex items-center justify-between gap-2 bg-white rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{selectedDistrict}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showDistrictFilter && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20 max-h-60 overflow-y-auto">
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
            <div className="flex-1 relative">
              <button
                onClick={() => {
                  setShowTypeFilter(!showTypeFilter);
                  setShowDistrictFilter(false);
                }}
                className="w-full flex items-center justify-between gap-2 bg-white rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <span className="text-sm text-gray-700">{selectedType}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {showTypeFilter && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
                  {chatTypes.map(type => (
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
          </div>
        </div>

        {/* Le Tue Chat */}
        {filteredJoinedChats.length > 0 && (
          <div className="border-b-8 border-gray-100">
            <div className="p-4 bg-gray-50">
              <h2 className="font-medium text-gray-900">Le Tue Chat</h2>
              <p className="text-sm text-gray-600">{filteredJoinedChats.length} chat attive</p>
            </div>
            <div>
              {filteredJoinedChats.map(renderJoinedChatItem)}
            </div>
          </div>
        )}

        {/* Scopri Chat Section */}
        <div>
          <div className="p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-medium text-gray-900">Scopri Chat</h2>
                <p className="text-sm text-gray-600">{filteredAvailableChats.length} chat disponibili</p>
              </div>
            </div>
          </div>

          {/* Available Chats List */}
          <div>
            {filteredAvailableChats.length > 0 ? (
              filteredAvailableChats.map(renderAvailableChatItem)
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <MessageSquare className="w-16 h-16 text-gray-300 mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">Nessuna chat trovata</h3>
                <p className="text-sm text-gray-600">
                  Prova a modificare i filtri di ricerca
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Calendar Button */}
      <button
        onClick={() => setShowEventsModal(true)}
        className="absolute bottom-20 right-6 w-14 h-14 bg-gradient-to-br from-teal-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-10"
        title="Eventi"
      >
        <Calendar className="w-6 h-6" />
      </button>

      {/* Join Chat Dialog */}
      {showJoinDialog && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h2>Unisciti alla Chat</h2>
                </div>
                <button 
                  onClick={() => setShowJoinDialog(null)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center text-white flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12 2C12 2 8 4 8 8C8 12 12 14 12 14C12 14 16 12 16 8C16 4 12 2 12 2Z" />
                    <path d="M12 14C12 14 8 16 8 20C8 22 10 22 12 22C14 22 16 22 16 20C16 16 12 14 12 14Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">{showJoinDialog.fountainName}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {showJoinDialog.memberCount} membri
                    </span>
                    {chatHasEvents(showJoinDialog) && (
                      <span className="flex items-center gap-1 text-sm text-teal-600">
                        <Calendar className="w-4 h-4" />
                        Con eventi
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Quartiere: <span className="font-medium">{getFountainDistrict(showJoinDialog.fountainName)}</span>
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-teal-700">
                  Unendoti a questa chat potrai partecipare alle conversazioni, vedere i messaggi e unirti agli eventi organizzati dalla community.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowJoinDialog(null)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={handleJoinChat}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Unisciti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
