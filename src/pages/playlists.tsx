import React from "react";
import { NextPage } from "next";

import { api } from "@/utils/api";
import Playlist from "@/components/Playlist";

const SongsPage: NextPage = () => {
  const { data } = api.playlist.listAll.useQuery();

  return (
    <div className="grid w-screen place-items-center">
      <h1 className="p-6 text-5xl font-bold">Playlists</h1>
      <ul className="grid max-w-5xl grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data?.playlists.map((playlist) => (
          <li key={playlist.id}>
            <Playlist {...playlist} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsPage;
