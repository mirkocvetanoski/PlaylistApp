import { redirect } from "next/navigation";
import connectDB from "../../config/database";
import GradientLayout from "../components/gradientLayout";
import SongTable from "../components/songsTable";
import { validateToken } from "../lib/auth";
import Playlist from "../models/Playlist";
import Song from "../models/Song";

const getBGColor = () => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const PlaylistPage = ({ playlist, songs }) => {
  const color = getBGColor();

  const filteredSongsByPlaylist = [];

  songs.map((song) => {
    if (song.playlists.includes(playlist._id)) {
      filteredSongsByPlaylist.push(song);
    }
  });

  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={playlist.image}
    >
      <SongTable songs={filteredSongsByPlaylist} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  await connectDB();

  let user;

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const [playlist] = await Playlist.find({ _id: query.id, user: user.id });
  const songs = await Song.find({});

  return {
    props: {
      playlist: JSON.parse(JSON.stringify(playlist)),
      songs: JSON.parse(JSON.stringify(songs)),
    },
  };
};

export default PlaylistPage;
