import { useState } from 'react';
import { X, MessageSquare, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';

interface CreateChatModalProps {
  onClose: () => void;
}

const categories = ['Generale', 'Manutenzione', 'Eventi', 'Sport', 'Social'];
const districts = ['Centro', 'Brera', 'Navigli', 'Sempione', 'Porta Venezia', 'Città Studi', 'Isola'];

export function CreateChatModal({ onClose }: CreateChatModalProps) {
  const [chatName, setChatName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Generale');
  const [selectedDistrict, setSelectedDistrict] = useState('Centro');
  const [description, setDescription] = useState('');
  const [isEventChat, setIsEventChat] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  const handleCreate = () => {
    if (!chatName.trim()) {
      alert('Inserisci un nome per la chat');
      return;
    }
    // In una vera app, qui si creerebbe la chat
    console.log('Creazione chat:', { chatName, selectedCategory, selectedDistrict, description, isEventChat });
    onClose();
  };

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            <h1>Crea Nuova Chat</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-teal-50 text-sm">
          Crea una community per una vedovella
        </p>
      </div>

      {/* Form Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Nome Chat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Chat *
            </label>
            <input
              type="text"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              placeholder="es. Vedovella Duomo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria *
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowDistrictDropdown(false);
                }}
                className="w-full flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900">{selectedCategory}</span>
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        selectedCategory === category ? 'bg-teal-50 text-teal-700' : 'text-gray-900'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quartiere */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quartiere *
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setShowDistrictDropdown(!showDistrictDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="w-full flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{selectedDistrict}</span>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </button>
              {showDistrictDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20 max-h-60 overflow-y-auto">
                  {districts.map(district => (
                    <button
                      key={district}
                      onClick={() => {
                        setSelectedDistrict(district);
                        setShowDistrictDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        selectedDistrict === district ? 'bg-teal-50 text-teal-700' : 'text-gray-900'
                      }`}
                    >
                      {district}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Descrizione */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrizione
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrivi lo scopo di questa chat..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Chat con Eventi */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isEventChat}
                onChange={(e) => setIsEventChat(e.target.checked)}
                className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <span className="font-medium text-gray-900">Chat con Eventi</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Organizza eventi e attività per questa vedovella
                </p>
              </div>
            </label>
          </div>

          {/* Info Box */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Users className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-teal-900 mb-1">
                  Community Zampillo
                </h4>
                <p className="text-sm text-teal-700">
                  Creando questa chat, diventerai automaticamente amministratore e potrai gestire i membri e gli eventi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={handleCreate}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Crea Chat
          </button>
        </div>
      </div>
    </div>
  );
}
