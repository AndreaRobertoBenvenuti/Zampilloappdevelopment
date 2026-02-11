import { useState, useEffect } from 'react';
import { MapPin, Award, Droplet, Filter, ChevronRight, X } from 'lucide-react';

const ONBOARDING_KEY = 'zampillo_onboarding_completed';

interface OnboardingStep {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    icon: <Droplet className="w-12 h-12 text-teal-600" />,
    title: 'Benvenuto in Zampillo!',
    description: 'Scopri e visita le iconiche vedovelle di Milano. Contribuisci alla sostenibilità e colleziona badge esplorando la città!',
    image: '💧'
  },
  {
    id: 2,
    icon: <MapPin className="w-12 h-12 text-blue-600" />,
    title: 'Trova Fontanelle',
    description: 'Usa la mappa interattiva per trovare le vedovelle vicino a te. Tocca un marcatore per vedere i dettagli e le recensioni della community.',
    image: '🗺️'
  },
  {
    id: 3,
    icon: <Award className="w-12 h-12 text-amber-600" />,
    title: 'Check-in e Punti',
    description: 'Fai check-in alle fontanelle per guadagnare punti esperienza, salire di livello e sbloccare badge speciali!',
    image: '🎯'
  },
  {
    id: 4,
    icon: <Filter className="w-12 h-12 text-purple-600" />,
    title: 'Filtra e Ordina',
    description: 'Usa i filtri avanzati per trovare fontanelle accessibili, refrigerate o pet-friendly. Ordina per distanza, qualità o popolarità.',
    image: '⚡'
  }
];

export function OnboardingTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Controlla se l'onboarding è già stato completato
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      // Mostra l'onboarding dopo un breve delay
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
  };

  const handleReset = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    setCurrentStep(0);
    setIsOpen(true);
  };

  // Esponi la funzione reset globalmente per il pulsante demo
  useEffect(() => {
    (window as any).resetOnboarding = handleReset;
    return () => {
      delete (window as any).resetOnboarding;
    };
  }, []);

  if (!isOpen) return null;

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-md animate-fade-in">
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-up border border-gray-100">
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-teal-600 to-green-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Step Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-teal-600'
                    : index < currentStep
                    ? 'w-2 bg-teal-400'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Icon/Image */}
          <div className="mb-6 flex flex-col items-center">
            <div className="text-7xl mb-4 animate-bounce-slow">{step.image}</div>
            <div className="p-4 bg-gray-50 rounded-full">{step.icon}</div>
          </div>

          {/* Title & Description */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h2>
          <p className="text-gray-600 leading-relaxed mb-8">{step.description}</p>

          {/* Actions */}
          <div className="flex gap-3">
            {currentStep === 0 ? (
              <button
                onClick={handleSkip}
                className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Salta Tutorial
              </button>
            ) : (
              <button
                onClick={handleSkip}
                className="px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Salta
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-green-600 text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Inizia!' : 'Avanti'}
              {currentStep < steps.length - 1 && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
