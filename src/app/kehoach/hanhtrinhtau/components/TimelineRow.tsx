import TimelineStep from "./TimelineStep";

export default function TimelineRow({ isLargeRow = false }) {
  const total = 6;

  return (
    <div className="flex justify-center mt-5">
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className="flex items-center">
          <TimelineStep
            key={index}
            index={index}
            isFirst={index === 0}
            isLast={index === total - 1}
            isLarge={isLargeRow}
          />

          {index < total - 1 && (
            <div className="h-[2px] bg-[#99d8ff] flex-1"></div>
          )}
        </div>
      ))}
    </div>
  );
}
