import React from "react";

interface PlaylistProps {
  description: string;
  href: string;
  id: string;
  images: { url: string }[];
  name: string;
  public: boolean;
  tracks: { href: string; total: number };
  uri: string;
}

const Playlist: React.FC<PlaylistProps> = ({
  images,
  name,
  public: isPublic,
  tracks,
}) => {
  return (
    <div className="max-w-xs overflow-hidden rounded shadow-lg">
      <img className="w-full" src={images[0]?.url} alt={name} />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{name}</div>
      </div>
      <div className="px-6 py-4">
        <span className="mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          {isPublic ? "Public" : "Private"}
        </span>
        <span className="mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          {tracks.total} Tracks
        </span>
      </div>
    </div>
  );
};

export default Playlist;
