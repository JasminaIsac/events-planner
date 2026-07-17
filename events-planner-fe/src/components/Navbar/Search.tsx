import { useState } from "react";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <form className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none">
        <MagnifyingGlassIcon className="text-gray-500" />

        <input
          type="text"
          value={query}
          onChange={(searched) => setQuery(searched.target.value)}
          placeholder="Search"
          className="bg-transparent outline-none text-sm flex-1"
        />
      </form>
    </div>
  );
}
