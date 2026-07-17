import { ArrowButton } from "~/components/UI";
import { useCalendarStore } from "~/store/calendarStore";

export default function Shift() {
  const { goNext, goPrev, goToday } = useCalendarStore();

  return (
    <div className="flex items-stretch gap-0.5">
      <ArrowButton
        label={"Previous day"}
        onClick={() => goPrev()}
        direction="left"
        className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-l-lg"
      />
      <button
        type="button"
        onClick={() => {
          goToday();
        }}
        className="min-w-20 flex items-center justify-center text-sm font-semibold cursor-pointer bg-gray-100 text-gray-700"
      >
        Today
      </button>
      <ArrowButton
        label={"Next day"}
        onClick={() => goNext()}
        direction="right"
        className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-r-lg"
      />
    </div>
  );
}
