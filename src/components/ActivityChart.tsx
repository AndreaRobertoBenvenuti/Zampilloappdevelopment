interface ActivityChartProps {
  data: { day: string; value: number }[];
  maxValue?: number;
}

export function ActivityChart({ data, maxValue }: ActivityChartProps) {
  // Calcola il valore massimo per scalare le barre.
  // Se non viene fornito un maxValue, lo calcoliamo dai dati.
  // Usiamo 1 come minimo per evitare divisioni per zero.
  const max = maxValue || Math.max(...data.map(d => d.value), 1);

  // Altezza massima in pixel che una barra può raggiungere all'interno del suo contenitore.
  const maxBarHeight = 80; // es. 80px

  return (
    <div className="w-full h-36 flex items-end justify-between gap-2 text-center">
      {data.map((item, index) => {
        // Calcola l'altezza della barra in pixel, proporzionale al valore massimo.
        const barHeight = max > 0 ? (item.value / max) * maxBarHeight : 0;

        return (
          <div key={index} className="flex-1 flex flex-col justify-end items-center">
            {/* Valore numerico */}
            <span className="text-sm font-semibold text-gray-800">
              {item.value}
            </span>
            
            {/* Barra */}
            <div
              className="w-3/4 bg-gradient-to-t from-teal-500 to-green-400 rounded-md transition-all duration-500 mt-1"
              style={{ height: `${barHeight}px` }}
            />
            
            {/* Giorno della settimana */}
            <span className="text-xs text-gray-500 font-medium border-t w-full pt-1 mt-2">
              {item.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}
