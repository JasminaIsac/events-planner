import LogoutIcon from "./LogoutIcon";
import Search from "./Search";
import DayShift from "./Shift";
import ViewToggle from "./ViewToggle";

export default function Navbar() {
  return (
    <header className="bg-white/90 px-6 py-4 w-full">
      <nav className="flex items-center justify-between">
        <DayShift />
        <ViewToggle />
        <div className="flex gap-2">
          <Search />
          <LogoutIcon />
        </div>
      </nav>
    </header>
  );
}
