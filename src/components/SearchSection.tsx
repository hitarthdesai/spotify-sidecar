import { api } from "@/utils/api";
import { useCombobox } from "downshift";
import { useDebounce } from "use-debounce";
import { useState } from "react";

export const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 400);

  const { data } = api.track.search.useQuery(
    { query: debouncedQuery },
    { enabled: !!query },
  );

  const items = data?.tracks ?? [];
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
    onInputValueChange: ({ inputValue }) => setQuery(inputValue ?? ""),
  });

  return (
    <div className="h-full w-1/2 bg-gray-200 p-4">
      <label htmlFor="search" className="text-lg font-semibold">
        Search
      </label>
      <div className="mt-4">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search tracks"
          className="w-full rounded-md border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          {...getInputProps()}
        />
        <ul className="mt-2 rounded-md bg-white shadow-lg" {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <li
                key={item.id}
                {...getItemProps({ item, index })}
                className={`${
                  highlightedIndex === index ? "bg-gray-200" : ""
                } cursor-pointer p-2 hover:bg-gray-100`}
              >
                <div className="flex items-center">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.artists.join(", ")}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
