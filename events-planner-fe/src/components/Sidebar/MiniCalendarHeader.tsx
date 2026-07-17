import { ArrowButton } from "~/components/UI";

type MiniCalendarHeaderProps = {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
};

export default function MiniCalendarHeader({
  month,
  onPrev,
  onNext,
}: MiniCalendarHeaderProps) {
  const monthName = month.toLocaleString("default", {
    month: "long",
  });
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-4xl font-semibold">
        {monthName} <span className="text-red-500">{month.getFullYear()}</span>
      </h2>

      <div className="flex">
        <ArrowButton
          label={"Change Month"}
          onClick={onPrev}
          direction="left"
          size={28}
          className="bg-none text-white hover:bg-gray-800 hover:text-white rounded-xl"
        />
        <ArrowButton
          label={"Change Month"}
          onClick={onNext}
          direction="right"
          size={28}
          className="bg-none text-white hover:bg-gray-800 hover:text-white rounded-xl"
        />
      </div>
    </div>
  );
}
