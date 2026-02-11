interface ActivityChartProps {
  data: { day: string; value: number }[];
  maxValue?: number;
}

export function ActivityChart({ data, maxValue }: ActivityChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value), 1); // Evita divisione per zero

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 h-32">
        {data.map((item, index) => {
          const heightPercent = (item.value / max) * 100;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              {/* Valore numerico sopra la barra */}
              <span className="text-sm font-medium text-gray-800 h-5">
                {item.value}
              </span>

              {/* Barra */}
              <div className="w-full flex flex-col justify-end h-24">
                <div
                  className="w-full bg-gradient-to-t from-teal-600 to-teal-400 rounded-lg transition-all duration-500 hover:from-teal-500 hover:to-teal-300 cursor-pointer"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Label giorno */}
              <span className="text-xs text-gray-600 font-medium">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
