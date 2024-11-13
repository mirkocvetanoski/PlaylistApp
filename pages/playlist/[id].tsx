import connectDB from "../../config/database";
import GradientLayout from "../components/gradientLayout";
import SongTable from "../components/songsTable";
import { validateToken } from "../lib/auth";
import Playlist from "../models/Playlist";

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

const PlaylistPage = ({ playlist }) => {
  const color = getBGColor();

  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={playlist.image}
    >
      <SongTable />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  await connectDB();

  const { id } = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  const [playlist] = await Playlist.find({ _id: query.id, user: id });

  return {
    props: {
      playlist: JSON.parse(JSON.stringify(playlist)),
    },
  };
};

export default PlaylistPage;
