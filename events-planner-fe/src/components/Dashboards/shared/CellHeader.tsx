type CellHeaderProps = {
  title: string;
  isToday: boolean;
  eventsCount: number;
};

export default function CellHeader({
  title,
  isToday,
  eventsCount,
}: CellHeaderProps) {
  return (
    <div className="mb-1 flex items-center justify-between">
      <span
        className={`
            flex p-2 items-center justify-center rounded-full leading-3 text-sm font-semibold
            ${isToday ? "bg-blue-500 text-white" : ""}
          `}
      >
        {title}
      </span>
      {eventsCount > 0 && (
        <span className="text-xs font-medium text-gray-500">
          {eventsCount === 1 ? "1 event" : `${eventsCount} events`}
        </span>
      )}
    </div>
  );
}
