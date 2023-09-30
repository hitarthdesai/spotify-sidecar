import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "@/utils/api";

const PlaylistPage = () => {
  const {
    query: { id },
  } = useRouter();

  const playlistId = Array.isArray(id) ? id[0] : id;
  console.log(playlistId);

  const { data, error } = api.playlist.byId.useQuery({
    id: playlistId ?? "4gfUPrIXM7VHIyIjmggWyr",
  });

  if (!data?.playlist) {
    return null;
  }
  const { playlist } = data;

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{playlist.name}</h1>
        <Link
          href="/playlist"
          className="inline-flex items-center rounded bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300"
        >
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M7.707 12l5.147-5.146a.5.5 0 01.854.353v3.793h6.793a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H13.71v3.793a.5.5 0 01-.854.353L7.707 12z" />
          </svg>
          Back
        </Link>
      </div>
      <p className="text-gray-600">{playlist.description}</p>
      <ul className="mt-4">
        {playlist.tracks.map((track) => (
          <li key={track.id} className="mb-2">
            <div className="flex items-center">
              {/* <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200">
                <img
                  src={song.albumArt}
                  alt={song.album}
                  className="h-full w-full rounded-full"
                />
              </div> */}
              <div className="ml-2">
                <h2 className="text-lg font-bold">{track.name}</h2>
                <p className="text-gray-600">{track.artists.join(", ")}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistPage;
