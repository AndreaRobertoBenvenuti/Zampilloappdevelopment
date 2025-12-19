import { useState } from 'react';
import { 
  ChevronLeft, 
  User, 
  Bell, 
  Lock, 
  Globe, 
  HelpCircle, 
  Info, 
  LogOut,
  ChevronRight,
  Moon,
  Volume2,
  MapPin,
  Shield,
  Mail,
  Trash2
} from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
}

export function SettingsView({ onBack }: SettingsViewProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Modifica Profilo', action: () => console.log('Profilo') },
        { icon: Mail, label: 'Email e Password', action: () => console.log('Email') },
        { icon: Shield, label: 'Privacy', action: () => console.log('Privacy') },
      ]
    },
    {
      title: 'Preferenze',
      items: [
        { 
          icon: Bell, 
          label: 'Notifiche', 
          toggle: true,
          value: notificationsEnabled,
          onChange: setNotificationsEnabled
        },
        { 
          icon: Volume2, 
          label: 'Suoni', 
          toggle: true,
          value: soundEnabled,
          onChange: setSoundEnabled
        },
        { 
          icon: MapPin, 
          label: 'Localizzazione', 
          toggle: true,
          value: locationEnabled,
          onChange: setLocationEnabled
        },
        { 
          icon: Moon, 
          label: 'Modalità Scura', 
          toggle: true,
          value: darkMode,
          onChange: setDarkMode
        },
      ]
    },
    {
      title: 'App',
      items: [
        { icon: Globe, label: 'Lingua', value: 'Italiano', action: () => console.log('Lingua') },
        { icon: HelpCircle, label: 'Aiuto e Supporto', action: () => console.log('Aiuto') },
        { icon: Info, label: 'Info App', value: 'v1.0.0', action: () => console.log('Info') },
      ]
    }
  ];

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-4">
        <div className="flex items-center gap-3 mb-2">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Impostazioni</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* User Info Card */}
        <div className="bg-white m-4 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Profilo"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Marco Rossi</h3>
              <p className="text-sm text-gray-600">marco.rossi@email.com</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs">
                  Livello 7
                </span>
                <span className="text-xs text-gray-500">2.450 punti</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            <h2 className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide">
              {section.title}
            </h2>
            <div className="bg-white">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <div key={itemIndex}>
                    {item.toggle ? (
                      // For toggle items, use div instead of button to avoid nesting
                      <div className="w-full px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-teal-600" />
                          </div>
                          <span className="text-gray-900">{item.label}</span>
                        </div>
                        
                        <button
                          onClick={() => item.onChange?.(!item.value)}
                          className={`
                            relative w-12 h-6 rounded-full transition-colors
                            ${item.value ? 'bg-teal-600' : 'bg-gray-300'}
                          `}
                          aria-label={`Toggle ${item.label}`}
                        >
                          <div className={`
                            absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform
                            ${item.value ? 'translate-x-6' : 'translate-x-0.5'}
                          `} />
                        </button>
                      </div>
                    ) : (
                      // For clickable items, use button
                      <button
                        onClick={item.action}
                        className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-teal-600" />
                          </div>
                          <span className="text-gray-900">{item.label}</span>
                        </div>
                        
                        {item.value ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{item.value}</span>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    )}
                    {itemIndex < section.items.length - 1 && (
                      <div className="mx-4 border-b border-gray-100" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="mb-4">
          <h2 className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide">
            Zona Pericolosa
          </h2>
          <div className="bg-white">
            <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-red-600">Elimina Account</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-4 pb-6">
          <button className="w-full bg-white border-2 border-teal-600 text-teal-600 py-3 rounded-xl hover:bg-teal-50 transition-colors flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            <span>Esci</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 pb-8 text-center">
          <p className="text-xs text-gray-500">
            Zampillo - Promuovere l'uso sostenibile dell'acqua pubblica
          </p>
          <p className="text-xs text-gray-400 mt-1">
            © 2025 Zampillo. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </div>
  );
}