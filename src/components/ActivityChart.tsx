interface ActivityChartProps {
  data: { day: string; value: number }[];
  maxValue?: number;
}

export function ActivityChart({ data, maxValue }: ActivityChartProps) {
  // Calcola il valore massimo per scalare le barre.
  const max = maxValue || Math.max(...data.map(d => d.value), 1);

  // Altezza massima in pixel che una barra può raggiungere.
  const maxBarHeight = 100; 

  return (
    <div className="w-full h-48 flex items-end justify-between gap-2">
      {data.map((item, index) => {
        // Calcola l'altezza della barra in pixel.
        // Se il valore è > 0, assicuriamo un'altezza minima di 4px per visibilità.
        let barHeight = 0;
        if (item.value > 0) {
          barHeight = Math.max((item.value / max) * maxBarHeight, 4);
        }

        return (
          <div key={index} className="flex-1 flex flex-col justify-end items-center h-full">
            {/* Valore numerico */}
            <span className="text-xs font-semibold text-gray-600 mb-1">
              {item.value}
            </span>
            
            {/* Barra */}
            <div
              className="w-full max-w-[24px] bg-teal-500 rounded-t-md transition-all duration-500"
              style={{ height: `${barHeight}px` }}
            />
            
            {/* Giorno della settimana */}
            <span className="text-xs text-gray-500 font-medium mt-2 border-t border-gray-200 w-full text-center pt-1">
              {item.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}
