interface ActivityChartProps {
  data: { day: string; value: number }[];
  maxValue?: number;
}

export function ActivityChart({ data, maxValue }: ActivityChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 h-32">
        {data.map((item, index) => {
          const heightPercent = (item.value / max) * 100;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              {/* Barra */}
              <div className="w-full flex flex-col justify-end h-24">
                <div
                  className="w-full bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-lg transition-all duration-500 hover:from-teal-500 hover:to-teal-300 cursor-pointer relative group"
                  style={{ height: `${heightPercent}%` }}
                >
                  {/* Tooltip al hover */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.value} check-in
                  </div>
                </div>
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
