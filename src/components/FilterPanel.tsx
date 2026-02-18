import { X, Accessibility, Droplets, Dog, CheckCircle2 } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function FilterPanel({ isOpen, onClose, filters, onFiltersChange }: FilterPanelProps) {
  if (!isOpen) return null;

  const handleReset = () => {
    onFiltersChange({
      accessibility: 'all',
      waterQuality: 'all',
      hasPetBowl: null,
      condition: 'all'
    });
  };

  const activeFiltersCount = [
    filters.accessibility !== 'all' && filters.accessibility !== undefined,
    filters.waterQuality !== 'all' && filters.waterQuality !== undefined,
    filters.hasPetBowl !== null,
    filters.condition !== 'all' && filters.condition !== undefined
  ].filter(Boolean).length;

  return (
    <div
      className="fixed inset-0 backdrop-blur-md bg-black/20 z-50 flex items-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full rounded-t-3xl max-h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300"
        style={{ maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4 rounded-t-3xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-900">Filtri Avanzati</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-teal-600">
                {activeFiltersCount} filtro{activeFiltersCount > 1 ? 'i' : ''} attiv{activeFiltersCount > 1 ? 'i' : 'o'}
              </span>
              <button
                onClick={handleReset}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                Resetta tutto
              </button>
            </div>
          )}
        </div>

        {/* Filters Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar min-h-0 overscroll-contain" style={{ minHeight: 0, WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}>
          {/* Accessibility Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Accessibility className="w-5 h-5 text-teal-600" />
              <h3 className="font-medium text-gray-900">Accessibilità</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onFiltersChange({ ...filters, accessibility: 'all' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.accessibility === 'all' || !filters.accessibility
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Tutte
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, accessibility: 'wheelchair' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.accessibility === 'wheelchair'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Accessibile ♿
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, accessibility: 'limited' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.accessibility === 'limited'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Parziale
              </button>
            </div>
          </div>

          {/* Water Quality Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="w-5 h-5 text-teal-600" />
              <h3 className="font-medium text-gray-900">Qualità Acqua</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onFiltersChange({ ...filters, waterQuality: 'all' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.waterQuality === 'all' || !filters.waterQuality
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Tutte
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, waterQuality: 'excellent' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.waterQuality === 'excellent'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Eccellente 💎
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, waterQuality: 'good' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.waterQuality === 'good'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Buona ⭐
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, waterQuality: 'average' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.waterQuality === 'average'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Discreta ✓
              </button>
            </div>
          </div>

          {/* Fountain Condition Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <h3 className="font-medium text-gray-900">Condizione</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onFiltersChange({ ...filters, condition: 'all' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.condition === 'all' || !filters.condition
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Tutte
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, condition: 'Ottima' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.condition === 'Ottima'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Ottima
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, condition: 'Buona' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.condition === 'Buona'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Buona
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, condition: 'Discreta' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  filters.condition === 'Discreta'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Discreta
              </button>
            </div>
          </div>

          {/* Special Features */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Caratteristiche Speciali</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onFiltersChange({ ...filters, hasPetBowl: filters.hasPetBowl === true ? null : true })}
                  className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    filters.hasPetBowl === true
                      ? 'border-teal-600 bg-teal-50 text-teal-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Dog className="w-5 h-5" />
                  <span className="font-medium">Con ciotola</span>
                </button>

                <button
                  onClick={() => onFiltersChange({ ...filters, hasPetBowl: filters.hasPetBowl === false ? null : false })}
                  className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    filters.hasPetBowl === false
                      ? 'border-teal-600 bg-teal-50 text-teal-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="relative">
                    <Dog className="w-5 h-5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-current rotate-45"></div>
                    </div>
                  </div>
                  <span className="font-medium">Senza ciotola</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={onClose}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            Applica Filtri
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
