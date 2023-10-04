import { api } from "@/utils/api";
import { useCombobox } from "downshift";

export const SearchSection = () => {
  const { data, error } = api.track.search.useQuery({ query: "BRUH" });
  console.log(data?.tracks);
  console.log(error);

  const items = ["Track 1", "Track 2", "Track 3", "Track 4"];
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
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
                key={item}
                {...getItemProps({ item, index })}
                className={`${
                  highlightedIndex === index ? "bg-gray-200" : ""
                } cursor-pointer p-2`}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
