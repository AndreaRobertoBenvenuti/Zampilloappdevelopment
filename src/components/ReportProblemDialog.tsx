import { useState } from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReportProblemDialogProps {
  isOpen: boolean;
  fountainName: string;
  onClose: () => void;
}

export function ReportProblemDialog({ isOpen, fountainName, onClose }: ReportProblemDialogProps) {
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const issues = [
    { id: 'not_working', label: 'Non Funzionante', icon: '🚫' },
    { id: 'low_pressure', label: 'Bassa Pressione', icon: '💧' },
    { id: 'dirty', label: 'Sporca/Non Pulita', icon: '🧹' },
    { id: 'damaged', label: 'Danneggiata', icon: '🔨' },
    { id: 'missing', label: 'Mancante', icon: '❓' },
    { id: 'other', label: 'Altro', icon: '📝' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;
    
    // Simula invio segnalazione
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      // Reset state after closing
      setTimeout(() => {
        setSubmitted(false);
        setSelectedIssue('');
        setDescription('');
      }, 300);
    }, 2000);
  };

  if (!isOpen) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
        <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-2">Segnalazione Inviata!</h2>
          <p className="text-gray-600">
            Grazie per aiutarci a mantenere le fontanelle in ottime condizioni. 
            Il nostro team verificherà la segnalazione al più presto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-gray-900">Segnala un Problema</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Fountain Name */}
          <div className="mb-6">
            <label className="text-sm text-gray-600 mb-1 block">Fontanella</label>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-900">{fountainName}</p>
            </div>
          </div>

          {/* Issue Type */}
          <div className="mb-6">
            <label className="text-sm text-gray-900 mb-3 block">
              Che tipo di problema hai riscontrato?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {issues.map((issue) => (
                <button
                  key={issue.id}
                  type="button"
                  onClick={() => setSelectedIssue(issue.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedIssue === issue.id
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{issue.icon}</div>
                  <div className="text-sm text-gray-900">{issue.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="text-sm text-gray-900 mb-2 block">
              Descrizione (opzionale)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Aggiungi dettagli aggiuntivi sul problema..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              Le segnalazioni aiutano la community e il comune di Milano a mantenere 
              le fontanelle in ottime condizioni. Grazie per il tuo contributo!
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={!selectedIssue}
              className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Invia Segnalazione
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}