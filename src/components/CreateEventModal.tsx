import { useState } from 'react';
import { X, Calendar, ChevronDown, Type, MapPin } from 'lucide-react';
import { EventType } from '../types';

interface CreateEventModalProps {
  fountainName: string;
  onClose: () => void;
}

const eventCategories: EventType[] = ['Pulizia', 'Passeggiata', 'Incontro', 'Workshop'];

export function CreateEventModal({ fountainName, onClose }: CreateEventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventType>(eventCategories[0]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleCreate = () => {
    if (!title.trim() || !date || !time) {
      alert('Per favore, compila tutti i campi obbligatori.');
      return;
    }
    // In a real app, you would handle the event creation here
    console.log('Creating event:', {
      title,
      description,
      date,
      time,
      category: selectedCategory,
      fountainName,
    });
    onClose();
  };

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            <h2>Crea Nuovo Evento</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-teal-50 text-sm">
          Organizza un evento per la community
        </p>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Fountain Info Box */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 flex items-center gap-3">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <MapPin className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <p className="text-xs text-teal-600 font-medium uppercase tracking-wide">Luogo Evento</p>
            <p className="text-gray-900 font-medium">{fountainName}</p>
          </div>
        </div>

        {/* Titolo Evento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titolo Evento *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="es. Pulizia di Primavera"
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
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{selectedCategory}</span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
                {eventCategories.map(category => (
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

        {/* Data e Ora */}
        <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Data *
              </label>
              <div className="relative">
                  <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
              </div>
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Ora *
              </label>
              <div className="relative">
                  <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
              </div>
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
            placeholder="Descrivi i dettagli dell'evento..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
          />
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
            Crea Evento
          </button>
        </div>
      </div>
    </div>
  );
}
