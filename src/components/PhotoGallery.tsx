import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  user: string;
  date: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (photos.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      {/* Foto principale */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={photos[currentIndex].url}
          alt={`Foto ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Navigazione */}
        {photos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Info foto */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
          <p className="text-sm font-medium">{photos[currentIndex].user}</p>
          <p className="text-xs opacity-90">{photos[currentIndex].date}</p>
        </div>

        {/* Indicatori */}
        {photos.length > 1 && (
          <div className="absolute top-3 right-3 bg-black bg-opacity-50 px-2 py-1 rounded-full">
            <span className="text-white text-xs font-medium">
              {currentIndex + 1}/{photos.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-teal-600 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-75'
              }`}
            >
              <img
                src={photo.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
