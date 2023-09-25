import React from "react";
import { NextPage } from "next";

import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

const SongsPage: NextPage = () => {
  const { data } = api.playlist.listAll.useQuery();
  console.log(data?.res);

  return (
    <div>
      <h1>Liked Songs</h1>
      {/* <ul>
        {songs?.map((song) => (
          <li key={song.id}>
            {song.name} - {song.artist}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default SongsPage;
